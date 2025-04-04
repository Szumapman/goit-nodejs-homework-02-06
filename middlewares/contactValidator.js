const joi = require('joi');

const contactValidator = (req, res, next) => {
    MIN_NAME_LENGTH = 3;
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        const requiredFields = ["name", "email", "phone"];
        const missingFields = requiredFields.filter(field => !req.body[field] || req.body[field] === "");
        const message = `missing required ${missingFields.join(", ")} - ${missingFields.length > 1 ? "fields" : "field"}`;
        return res.status(400).json({ message: message });
    }
    const schema = joi.object({ // required() for all fields can be removed, as long as I check the missing fields above
        name: joi.string().min(MIN_NAME_LENGTH).required(), 
        email: joi.string().email().required(),
        phone: joi.string().pattern(/^\(?\+?\d{1,4}?\)?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}$/).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        if (error.message.includes("phone") && error.message.includes("pattern")) {
            return res.status(400).json({ message: "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +" });
        }
        return res.status(400).json({ message: error.message });
    }
    next();
}

module.exports = contactValidator;