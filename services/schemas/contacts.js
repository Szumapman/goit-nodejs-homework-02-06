const { required } = require('joi');
const mongoose = require('mongoose');

const contacts = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false }
);

module.exports = mongoose.model('contacts', contacts);