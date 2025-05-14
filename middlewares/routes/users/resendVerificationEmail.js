const { sendVerificationEmail } = require('../../../utils/emails');
const { getUser } = require('../../../repositories/users');
const resendVerificationEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'missing required field email' });
        }
        const user = await getUser({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.verify) {
            return res.status(400).json({ message: 'Verification has already been passed' });
        }
        await sendVerificationEmail(email, user._id);
        res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        next(error);
    }
};

module.exports = resendVerificationEmail;