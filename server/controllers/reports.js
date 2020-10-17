const Report = require('../models/report');

exports.load = async (req, res, next, id) => {
    try {
        const report = await Report.findById(id);
        if (!report) return res.status(404).json({ message: 'Report not found' });
        req.report = report;
        next();
    } catch (err) {
        if (err.name === 'CastError')
            return res.status(400).json({ message: 'Invalid report id' });
        return next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { offender, reporter, offence, community, post } = req.body;
        const report = await Report.create({
            offender,
            reporter,
            offence,
            community,
            post
        });
        res.status(201).json(report);
    } catch (err) {
        next(err);
    }
};

exports.show = async (req, res) => {
    res.json(req.report);
};

exports.listAll = async (req, res, next) => {
    try {
        const reports = await Report.find({}).sort('-created');
        res.json(reports);
    } catch (err) {
        next(err);
    }
};

exports.listByCommunity = async (req, res, next) => {
    try {
        const reports = await Report.find({ community: req.community.id }).sort('-created');
        res.json(reports);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    let report = req.report;

    let update = {};
    Object
        .entries(req.body)
        .forEach(([key, value]) => update = {
            ...update,
            [key]: value
        });
    report.set(update);
    report
        .save()
        .then(doc => res.json({ success: true, message: 'Report updated', doc }))
        .catch(err => res.status(500).json({ success: false, message: 'Something went wrong while updating' }))
};

exports.destroy = async (req, res, next) => {
    try {
        const id = req.report.id;
        await req.report.remove();
        res.json({ success: true, message: 'Report deleted', id });
    } catch (err) {
        next(err)
    }
};