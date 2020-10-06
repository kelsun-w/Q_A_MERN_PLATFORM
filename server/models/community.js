const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String
});

ruleSchema.set('toJSON', { 'getters': true });
ruleSchema.options.toJSON.transform = function (doc, ret) {
    delete ret._id;
    return ret;
};

const communitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    rules: [ruleSchema],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created: { type: Date, default: Date.now() },
    members: { type: Number, default: 0 },
    mods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    banned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    picture: String,
});

communitySchema.set('toJSON', { getters: true });
communitySchema.options.toJSON.transform = (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
};

communitySchema.methods.addRule = function (title, description) {
    this.rules.push({ title, description });
    return this.save();
};

communitySchema.methods.removeRule = function (id) {
    const rule = this.rules.id(id);
    if (!rule) return { success: false, message: 'Rule not found' };
    
    rule.remove();
    return this.save().then(() => ({ success: true }));
};

/**
 * @description Add a user to the moderators list of the community. 
 * If user already exists in the list, removes them instead.
 * 
 * @returns populated Community object
 */
communitySchema.methods.modUser = function (id) {
    const user = this.mods.find(mod => mod._id.equals(id));

    var added;
    if (!user) {
        this.mods.push(id);
        added = true;
    } else {
        this.mods.pull(user);
        added = false;
    }
    return this
        .save()
        .then(res => ({ success: added, community: res }));
};

/**
 * @description Add a user to the banned list of the community. 
 * If user already exists in the list, removes them instead.
 * 
 * @returns populated Community object
 */
communitySchema.methods.banUser = function (id) {
    const user = this.banned.find(ban => ban._id.equals(id));
    if (!user) {
        this.banned.push(id);
    } else {
        this.banned.pull(user);
    }
    return this.save();
};

communitySchema.methods.addUser = function () {
    this.members++;
    return this.save();
};

communitySchema.methods.removeUser = function () {
    this.members--;
    return this.save();
};

communitySchema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});

communitySchema.post('save', function (doc, next) {
    doc
        .populate('creator', 'username picture')
        .populate('mods', 'username picture')
        .populate('banned', 'username picture')
        .execPopulate()
        .then((doc) => {
            next()
        });
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;