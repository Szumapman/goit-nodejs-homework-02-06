const joi = require('joi');

const favoriteValidator = (req, res, next) => {
    const schema = joi.object({
        favorite: joi.boolean().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "missing field favorite" });
    }
    next();
};

module.exports = favoriteValidator;