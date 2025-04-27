const getCurrentUser = async (req, res, next) => {
    try {
        res.status(200).json({ email: req.user.email, subscription: req.user.subscription, avatarURL: req.user.avatarURL });
    } catch (error) {
        next(error);
    }
};

module.exports = getCurrentUser;