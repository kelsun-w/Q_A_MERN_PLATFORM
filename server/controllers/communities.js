const Community = require('../models/community');
const User = require('../models/user');
const path = require('path');
const { json } = require('express');

exports.load = async (req, res, next, id) => {
    try {
        const community = await Community.findOne({ name: id });
        if (!community) return res.status(404).json({ message: 'community not found' });
        //Cannot get document middleware population to work so using this hack instead
        community
            .populate('creator', 'username picture')
            .populate('mods', 'username picture')
            .populate('banned.user', 'username picture')
            .execPopulate()
            .then((doc) => {
                req.community = doc;
                next()
            });
    } catch (err) {
        if (err.name === 'CastError')
            return res.status(400).json({ message: 'invalid community id' });
        return next(err);
    }
};

exports.show = async (req, res) => {
    res.json(req.community);
};

exports.update = async (req, res, next) => {
    let community = await req.community;

    let update = {};
    Object
        .entries(req.body)
        .forEach(([key, value]) => update = {
            ...update,
            [key]: value
        });
    community.set(update);
    community
        .save()
        .then((doc) => res.json(doc))
        .catch(err => res.status(500).json({ message: 'Something went wrong while updating' }));
};

// exports.update = async (req, res) => {
//     var community = req.community;

//     let list = Object.entries(req.body);
//     let update = {};
//     for (var i = 0; i < list.length; i++) {
//         const [key, value] = list[i];
//         update[key] = value;
//     };
//     return res.json(update);
//     community.set(update);
//     community
//         .save()
//         .then((doc) => res.json(doc))
//         .catch(err => next(err));
// };

exports.listAll = async (req, res, next) => {
    try {
        const communities = await Community.find({}).sort('-members');
        res.json(communities);
    } catch (err) {
        next(err);
    }
};

exports.ListByUser = async (req, res, next) => {
    try {
        const id = req.params.user;
        const user = await User.findById(id);
        res.json(user.communities);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const creator = req.user.id;
        const community = await Community.create({
            name,
            description,
            creator
        });
        res.status(201).json(community);
    } catch (err) {
        next(err);
    }
};

exports.createByAdmin = async (req, res, next) => {
    try {
        const { username, name, description } = req.body;
        const creator = await User.findOne({ username });
        if (!creator) return res.status(404).json({ message: 'No such user found' })

        const community = await Community.create({
            creator: creator.id,
            name,
            description
        });
        res.json({ data: community });
    } catch (err) {
        next(err);
    }
};

exports.addRule = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const community = await req.community.addRule(title, description);
        res.status(200).json(community);
    } catch (err) {
        next(err);
    }
};

exports.removeRule = async (req, res, next) => {
    try {
        const rule = req.params.rule;
        const result = await req.community.removeRule(rule);
        console.log(result);
        if (!result.success) return res.status(404).json(result);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.addMember = async (req, res, next) => {
    try {
        const id = req.params.user;
        const user = await User.findById(id);
        if (!user) res.status(404).json({ message: 'No such user exist' });

        const result = await user.community(req.community);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.modUser = async (req, res, next) => {
    try {
        const username = req.params.user;
        const user = await User.findOne({ username });
        if (!user) res.status(404).json({ message: 'No such user exist' });

        const result = await req.community.modUser(user.id);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.addUserBan = async (req, res, next) => {
    try {
        const username = req.body.user;
        const user = await User.findOne({ username: username });
        if (!user) res.status(404).json({ message: 'No such user exist' });
        //replacing username in body with id
        req.body.user = user.id;
        const result = await req.community.addBan(req.body);
        if (!result.success) return res.status(400).json(result);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.removeUserBan = async (req, res, next) => {
    try {
        const id = req.params.user;

        const result = await req.community.removeBan(id);
        if (!result.success) return res.status(400).json(result);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.addAvatar = (req, res, next) => {
    req.community.picture = req.file.path;
    req.community
        .save()
        .then(() => {
            res.json({ message: 'Updated community avatar' });
        });
};

exports.getAvatar = (req, res, next) => {
    res.sendFile(path.join(__dirname, '\\..\\', req.community.picture));
};

exports.destroy = async (req, res) => {
    await req.community.remove();
    res.json({ message: 'success' });
};

exports.getAllById = async (req, res, next) => {
    const list = await Community.find().sort('-name');
    res.json({ data: list });
};

exports.getById = async (req, res, next) => {
    const result = await Community.findById(req.params.id);
    if (!result) return res.status(404).json({ message: 'No such community found' });
    result
        .populate('creator', 'username picture email')
        .populate('mods', 'username picture email')
        .populate('banned.user', 'username picture email')
        .execPopulate()
        .then((doc) => {
            res.json({ data: doc });
        });
};

exports.updateById = async (req, res, next) => {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ message: 'No such community found' });

    let update = {};
    Object
        .entries(req.body)
        .forEach(([key, value]) => update = {
            ...update,
            [key]: value
        });

    community.set(update);
    community
        .save()
        .then((doc) => res.json({ data: doc }))
        .catch(err => {
            console.log(err.message);
            return res.status(500).json({ message: 'Something went wrong while updating' })
        });
};

exports.deleteById = async (req, res) => {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ message: 'No such community found' });

    await community.remove();
    res.json({ message: 'success' });
};