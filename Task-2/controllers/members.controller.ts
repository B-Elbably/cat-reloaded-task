import type { Request, Response, NextFunction } from 'express';
import Member from '../models/Member.js';

const subcircles = ['nodejs', 'php', 'java', 'dotnet'] as const;
const levels = ['beginner', 'intermediate', 'advanced'] as const;
type SubcircleElement = typeof subcircles[number];
type LevelElement = typeof levels[number];

export const getAllMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        interface Query {
            subcircle?: SubcircleElement;
            level?: LevelElement;
            name?: { $regex: string; $options: string };
        }
        const { subcircle, level, name } = req.query;
        const query: Partial<Query> = {};
        if (subcircle && subcircles.includes(subcircle as SubcircleElement)) query.subcircle = subcircle as SubcircleElement;
        if (level && levels.includes(level as LevelElement)) query.level = level as LevelElement;
        if (name && typeof name === 'string') query.name = { $regex: name, $options: 'i' };

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

export const createMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Member.create(req.body);
        res.redirect('/members');
    } catch (err) {
        next(err);
    }
};

export const editMemberForm = async (req: Request, res: Response, next: NextFunction) => {
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

export const updateMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Member.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
        });
        res.status(200).json({ success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Member.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (err) {
        next(err);
    }
};
