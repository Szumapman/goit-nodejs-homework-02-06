const joi = require('joi');

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 30;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/;

const userValidator = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH).pattern(PASSWORD_PATTERN).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        if (error.message.includes("password") && error.message.includes("pattern")) {
            return res.status(400).json({ message: "password must contain at least one lowercase letter, one uppercase letter, one number and one special character" });
        }
        return res.status(400).json({ message: error.message });
    }
    next();
}

module.exports = userValidator;