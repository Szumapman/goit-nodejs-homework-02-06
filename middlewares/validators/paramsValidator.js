const joi = require('joi');

const paramsValidator = (req, res, next) => {
    const { page, limit, favorite } = req.query;
    const schema = joi.object({
        page: joi.number().integer().min(1),
        limit: joi.number().integer().min(1),
        favorite: joi.boolean(),
    });
    const { error } = schema.validate({ page, limit, favorite });
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
};

module.exports = paramsValidator;
        