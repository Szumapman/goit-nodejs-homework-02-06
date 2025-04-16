const logout = async (req, res, next) => {
    try {
        req.user.isLoggedIn = false;
        await req.user.save();
        res.status(204);
    } catch (error) {
        next(error);
    }
};

module.exports = logout;