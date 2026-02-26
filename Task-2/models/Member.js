const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
            minlength: [3, 'Name must be at least 3 characters'],
            maxlength: [50, 'Name must be less than 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please add a valid email'],
        },
        circle: {
            type: String,
            default: 'backend',
        },
        subcircle: {
            type: String,
            required: [true, 'Please select a subcircle'],
            enum: ['nodejs', 'php', 'java', 'dotnet'],
        },
        level: {
            type: String,
            required: [true, 'Please select a level'],
            enum: ['beginner', 'intermediate', 'advanced'],
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Member', memberSchema);
