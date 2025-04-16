const joi = require('joi');
const { STARTER, PRO, BUSSINES } = require('../../constants/subscriptions');


const subscriptionValidator = (req, res, next) => {
    const schema = joi.object({
        subscription: joi.string().valid(STARTER, PRO, BUSSINES).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
};

module.exports = subscriptionValidator;