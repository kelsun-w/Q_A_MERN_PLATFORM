const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  studentNo: { type: String, unique: true, required: true },
  major: String,
  admin: Boolean,
  communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }],
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  score: { type: Number, default: 1 },
  display_name: String,
  display_about: String,
  picture: String,
  joined: { type: Date, default: Date.now },
}, { collation: { locale: 'en', strength: 1 } });

userSchema.set('toJSON', { getters: true });
userSchema.options.toJSON.transform = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
  delete ret.password;
  return ret;
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.pre(/^find/, function () {
  this.populate('communities', 'name picture');
  this.populate('saved', '-comments');
});

userSchema.post('save', function (doc, next) {
  doc
    .populate('communities', 'name picture')
    .populate('saved', '-comments')
    .execPopulate()
    .then(() => next());
});

/**
 * @description Adds a user to the community and returns back the updated community 
 * @returns updated community
 * @param {*} community 
 */
userSchema.methods.community = async function (community) {
  const doc = this.communities.find(c => c.equals(community._id));

  var joined; //did user join or leave community? 
  if (!doc) {
    community.addUser();
    joined = true;
    this.communities.push(community._id);
  } else {
    community.removeUser();
    joined = false;
    this.communities.pull(doc);
  }
  return this
    .save()
    .then(res => ({ success: joined, user: res }));
};

/**
 * @description Adds a post to saved list and returns back the updated saved list 
 * @returns updated save list
 * @param {*} postToSave 
 */
userSchema.methods.savePost = async function (postToSave) {
  const doc = this.saved.find(p => p.equals(postToSave._id));
  var added; //did user add or remove from list? 
  if (!doc) {
    added = true;
    this.saved.push(postToSave._id);
  } else {
    added = false;
    this.saved.pull(doc);
  }

  return this
    .save()
    .then(res => ({ success: added, message: 'Post ' + (added ? 'saved' : 'removed from saved list') + ' successfully' }));
};

userSchema.methods.scoreChange = async function (vote) {
  if (Number.isInteger(vote)) {
    this.score += vote;
    return this.save();
  } else {
    throw new Error('Invalid vote amount type. Should be an interger value');
  }

}

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
