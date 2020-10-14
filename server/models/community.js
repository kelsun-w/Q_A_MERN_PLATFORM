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

const banSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    offence: { type: String, required: true },
    note: String,
    created: { type: Date, default: Date.now }
});

banSchema.set('toJSON', { getters: true });
//mongoose allows function to transform the returned object.
banSchema.options.toJSON.transform = (doc, ret) => {
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
    banned: [banSchema],
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
communitySchema.methods.addBan = function (body) {
    const user = this.banned.find(ban => (ban.user._id.equals(body.user)));
    if (user) return { success: false, message: 'User already in ban list' };

    this.banned.push(body);
    return this
        .save()
        .then(() => ({ success: true, message: 'User added to ban list' }));
};

communitySchema.methods.removeBan = function (id) {
    const user = this.banned.find(ban => (ban.user._id.equals(id)))
    if (!user) return { success: false, message: 'No such user in ban list' };
    user.remove();
    return this
        .save()
        .then(() => ({ success: true, message: 'User removed from ban list' }));
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
        .populate('creator', 'username picture -communities')
        .populate('mods', 'username picture -communities')
        .populate('banned.user', 'username picture -communities')
        .execPopulate()
        .then((doc) => {
            next()
        });
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;