const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
    created: { type: Date, default: Date.now },
    children: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    score: { type: Number, default: 0 },
    votes: [{ user: Schema.Types.ObjectId, vote: Number, _id: false }]
});

commentSchema.set('toJSON', { getters: true });
//mongoose allows function to transform the returned object.
commentSchema.options.toJSON.transform = (doc, ret) => {
    delete ret._id;
    return ret;
};

commentSchema.methods.vote = async function (user, vote) {
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


commentSchema.methods.addChild = async function (commentId) {
    let comment = this.children.find(item => item.equals(commentId));
    if (comment) throw new Error('Child comment already exist');
    this.children.push(commentId);
    return this.save();
};

commentSchema.methods.removeChild = async function (commentId) {
    let comment = this.children.find(item => item.equals(commentId));
    if (!comment) throw new Error('Child comment does not exist');
    this.children.pull(commentId);
    return this.save();
};

commentSchema.methods.destroy = async function () {
    let children = this.children;
    if (children.length > 0) {
        for (let i = 0; i < children.length; i++) {
            let childComment = await Comment.findById(children[i]);
            childComment.destroy();
        };
    }
    return this.delete();
};

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;