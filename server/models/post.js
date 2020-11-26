const mongoose = require('mongoose');
const { authorize } = require('passport');
const Schema = mongoose.Schema;
const User = require('./user');
const Comment = require('./comment');

const postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  score: { type: Number, default: 0 },
  votes: [{ user: Schema.Types.ObjectId, vote: Number, _id: false }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  created: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  type: { type: String, default: 'link', required: true },
  text: { type: String },
});
//return virtuals in toJSON calls  
postSchema.set('toJSON', { getters: true, virtuals: true });
postSchema.options.toJSON.transform = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
  return ret;
};

postSchema.virtual('upvotePercentage').get(function () {
  if (this.votes.length === 0) return 0;
  const upvotes = this.votes.filter(vote => vote.vote === 1);
  return Math.floor((upvotes.length / this.votes.length) * 100);
});

postSchema.methods.vote = async function (user, vote) {
  const existingVote = this.votes.find(item => item.user._id.equals(user));
  const author = this.author && await User.findById(this.author.id);

  if (existingVote) {
    // reset score
    this.score -= existingVote.vote;
    if (author) await author.scoreChange(-(existingVote.vote));

    if (vote === 0) {
      // remove vote
      this.votes.pull(existingVote);
    } else {
      // change vote
      this.score += vote;
      existingVote.vote = vote;
      if (author) await author.scoreChange(vote);
    }
  } else if (vote !== 0) {
    // new vote
    this.score += vote;
    this.votes.push({ user, vote });
    if (author) await author.scoreChange(vote);
  }

  return this.save();
};

postSchema.methods.addComment = async function (author, body) {
  const newComment = await Comment.create({
    author,
    body
  })
  this.comments.push(newComment._id);
  return this.save();
};

postSchema.methods.removeComment = function (commentId) {
  const comment = this.comments.find(item => item.equals(commentId));
  if (!comment) throw new Error('Comment not found');
  comment.destroy();
  return this.save();
};

postSchema.methods.addCommentChild = async function (authorId, body, commentId) {
  let exists = this.comments.find(item => item.equals(commentId));
  let comment = await Comment.findById(commentId);
  if (!exists && !comment) return { success: false };
  let child = await Comment.create({
    author: authorId,
    body
  });

  comment.addChild(child._id);
  return this
    .save()
    .then(doc => (
      {
        success: true,
        doc
      }
    ));
};

postSchema.methods.removeCommentChild = function (parentCommentId, childCommentId) {
  const comment = this.comments.find(item => item.equals(parentCommentId));
  if (!comment) throw new Error('Comment does not exist');

  comment.removeChild(childCommentId);
  return this.save();
}

postSchema.pre(/^find/, function () {
  console.log('find')
  this
    .populate('author', 'username picture -communities -saved')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'username picture -communities -saved'
      }
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'children',
        populate: {
          path: 'author',
          select: 'username picture -communities -saved'
        }
      }
    })
});

postSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

//Populating here means the user gets the all fields on every save.
//For example, when creating the document, on success, they'll get a populated object BUT not when they GET.
postSchema.post('save', function (doc, next) {
  if (this.wasNew) this.vote(this.author._id, 1);
  console.log('save')
  doc
    .populate('author', 'username picture -communities -saved')
    .populate({
      path: 'comments',
      populate: [
        {
          path: 'author',
          select: 'username picture -communities -saved'
        },
        {
          path: 'children',
          populate: {
            path: 'author',
            select: 'username picture -communities -saved'
          }
        }]
    })
    .execPopulate()
    .then(() => next());
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
