const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Community = require('../models/community');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  studentNo: { type: String, unique: true, required: true },
  major: String,
  admin: Boolean,
  communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }],
  score: { type: Number, default: 0 },
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
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre(/^find/, function () {
  this.populate('communities');
});

userSchema.post('save', function (doc, next) {
  doc.
    populate('communities').
    execPopulate().
    then(() => next());
});

/**
 * @description Adds a user to the community and returns back the updated community 
 * @returns updated community
 * @param {*} community 
 */
userSchema.methods.community = async function (community) {
  const doc = this.communities.find(c => c.equals(community._id));
  if (!doc) {
    community.addUser();
    this.communities.push(community._id);
  } else {
    community.removeUser();
    this.communities.pull(doc);
  }
  return this.save();
};

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
