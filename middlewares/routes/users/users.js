const User = require('../../../services/schemas/users');
const { getUser } = require('../../../repositories/users');

const signUpUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await getUser({ email });
        if (user) {
            return res.status(409).json({ message: 'Email in use' });
        }
        const newUser = new User({ email });

    } catch (error) {
        next(error);
    }
};

module.exports = { signUpUser };