import { boolean } from 'joi';
import { STARTER, PRO, BUSSINES } from '../../constants/subscriptions';
const mongoose = require('mongoose');

const users = new mongoose.Schema(
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
            type: boolean,
            default: false,
        }
    },
    { versionKey: false, timestamps: true }
)

module.exports = mongoose.model('users', users, 'user');