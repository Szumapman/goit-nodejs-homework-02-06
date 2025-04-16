const setSubscription = async (req, res, next) => {
    try {
        const { subscription } = req.body;
        if (req.user.subscription === subscription) {
            return res.status(400).json({ message: 'Subscription already set' });
        }
        req.user.subscription = subscription;
        await req.user.save();
        res.status(200).json({ message: 'Subscription changed', user: { email: req.user.email, subscription: req.user.subscription } });
    } catch (error) {
        next(error);
    }
};

module.exports = setSubscription;