const User = require('../../../services/schemas/users');
const { getUser } = require('../../../repositories/users');
const { createDefaultAvatar } = require('../../../utils/avatars');

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await getUser({ email });
        if (user) {
            return res.status(409).json({ message: 'Email in use' });
        }
        const avatarURL = createDefaultAvatar(email);
        const newUser = new User({ email, avatarURL });
        await newUser.setHashedPassword(password);
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        next(error);
    }
};

module.exports = signup;