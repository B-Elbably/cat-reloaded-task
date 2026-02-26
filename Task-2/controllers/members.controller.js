const Member = require('../models/Member');

const subcircles = ['nodejs', 'php', 'java', 'dotnet'];
const levels = ['beginner', 'intermediate', 'advanced'];

exports.getAllMembers = async (req, res, next) => {
    try {
        const { subcircle, level, name } = req.query;
        const query = {};
        if (subcircle) query.subcircle = subcircle;
        if (level) query.level = level;
        if (name) query.name = { $regex: name, $options: 'i' };

        const members = await Member.find(query).sort('-createdAt');
        res.render('members/index', {
            title: 'Members',
            members,
            subcircles,
            levels,
            filters: {
                name: name || '',
                subcircle: subcircle || '',
                level: level || '',
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.createMember = async (req, res, next) => {
    try {
        await Member.create(req.body);
        res.redirect('/members');
    } catch (err) {
        next(err);
    }
};

exports.editMemberForm = async (req, res, next) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return next(new Error('Member not found'));
        res.render('members/edit', {
            title: 'Edit Member',
            member,
            subcircles,
            levels,
        });
    } catch (err) {
        next(err);
    }
};

exports.updateMember = async (req, res, next) => {
    try {
        await Member.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
        });
        res.status(200).json({ success: true });
    } catch (err) {
        next(err);
    }
};

exports.deleteMember = async (req, res, next) => {
    try {
        await Member.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (err) {
        next(err);
    }
};
