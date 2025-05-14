const { STARTER, PRO, BUSSINES } = require('../../constants/subscriptions');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

const user = new mongoose.Schema(
    {
        password: {
            type: String,
            require: [true, "Password is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        subscription: {
            type: String,
            enum: [STARTER, PRO, BUSSINES],
            default: STARTER,
        },
        isLoggedIn: { // because saving tokens in DB is not the best practice, I changed field token to isLoggedIn
            type: Boolean,
            default: false,
        },
        avatarURL: {
            type: String,
        },
        verify: {
            type: Boolean,
            default: false,
        }
    },
    { versionKey: false, timestamps: true }
);

user.methods.setHashedPassword = async function (password) {
    this.password = await bcrypt.hash(password, SALT_ROUNDS);
};

user.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', user, 'user');

module.exports = User;