const Community = require('../models/community');
const User = require('../models/user');

exports.load = async (req, res, next, id) => {
    try {
        req.community = await Community.findOne({ name: id });
        if (!req.community) return res.status(404).json({ message: 'community not found' });
    } catch (err) {
        if (err.name === 'CastError')
            return res.status(400).json({ message: 'invalid community id' });
        return next(err);
    }
    next();
};

exports.show = async (req, res) => {
    res.json(req.community);
};

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
        const community = await req.community.removeRule(rule);
        res.status(200).json(community);
    } catch (err) {
        next(err);
    }
};

exports.addMember = async (req, res, next) => {
    try {
        const id = req.params.user;
        const user = await User.findById(id);
        const result = await user.community(req.community);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.modUser = async (req, res, next) => {
    try {
        const user = req.params.user;
        const community = await req.community.modUser(user);
        res.status(200).json(community);
    } catch (err) {
        next(err);
    }
};

exports.banUser = async (req, res, next) => {
    try {
        const user = req.params.user;
        const community = await req.community.banUser(user);
        res.status(200).json(community);
    } catch (err) {
        next(err);
    }
};

exports.addAvatar = (req, res, next) => {
    const community = Community.findOneAndUpdate(
        { _id: req.body.id },
        { picture: req.file.path },
        { new: true }
    )
        .exec()
        .then(doc => {
            res.status(200).json({
                message: 'Updated',
                doc
            });
        })
        .catch(err => {
            next(err);
        })
}

exports.destroy = async (req, res) => {
    await req.community.remove();
    res.json({ message: 'success' });
}