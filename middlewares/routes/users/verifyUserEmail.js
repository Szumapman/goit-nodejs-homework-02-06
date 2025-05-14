const jwt = require('jsonwebtoken');
const User = require('../../../services/schemas/users');
const { getUser } = require('../../../repositories/users');
require('dotenv').config();

const verifyUserEmail = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const decodedToken = jwt.verify(verificationToken, process.env.VERIFICATION_TOKEN_SECRET);
        const user = await getUser({ _id: decodedToken.id });
        if (!user || user.verify ) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.verify = true;
        await user.save();
        res.status(200).json({ message: 'Verification successful' });
    } catch (error) {
        next(error);
    }
};

module.exports = verifyUserEmail;