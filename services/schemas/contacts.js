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
            required: [true, 'Email is required'], // because it was required in contactValidator middleware I added required: true here
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'], // because it was required in contactValidator middleware I added required: true here
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false }
);

module.exports = mongoose.model('contacts', contacts);