const jwt = require('jsonwebtoken');
const { getUser } = require('../../../repositories/users');

const MESSAGE_WRONG_LOGIN = 'Email or password is wrong';
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await getUser({ email });
        if (!user) {
            return res.status(401).json({ message: MESSAGE_WRONG_LOGIN });
        }
        if (!user.verify) {
            return res.status(401).json({ message: "Email not verified. Check your inbox for the verification link first." });
        }
        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: MESSAGE_WRONG_LOGIN });
        }
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        user.isLoggedIn = true;
        await user.save();
        res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
    } catch (error) {
        next(error);
    }
};

module.exports = login;