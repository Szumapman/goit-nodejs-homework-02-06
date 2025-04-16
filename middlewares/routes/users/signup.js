const User = require('../../../services/schemas/users');
const { getUser } = require('../../../repositories/users');

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await getUser({ email });
        if (user) {
            return res.status(409).json({ message: 'Email in use' });
        }
        const newUser = new User({ email });
        await newUser.setHashedPassword(password);
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        next(error);
    }
};

module.exports = signup;