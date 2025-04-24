const express = require('express')
const userValidator = require('../../middlewares/validators/userValidator');
const signup = require('../../middlewares/routes/users/signup');
const login = require('../../middlewares/routes/users/login');
const logout = require('../../middlewares/routes/users/logout');
const auth = require('../../middlewares/auth/auth');
const getCurrentUser = require('../../middlewares/routes/users/getCurrentUser');
const subscriptionValidator = require('../../middlewares/validators/subscriptionValidator');
const setSubscription = require('../../middlewares/routes/users/setSubscription');
const uploadAvatar = require('../../middlewares/routes/users/uploadAvatar');
const moveAvatar = require('../../middlewares/routes/users/moveAvatar');
const setAvatar = require('../../middlewares/routes/users/setAvatar');

const router = express.Router()


router.post('/signup', userValidator, signup);

router.post('/login', userValidator, login);

router.get('/logout', auth, logout);

router.get('/current', auth, getCurrentUser);

router.patch('/', subscriptionValidator, auth, setSubscription);

router.patch('/avatars', auth, uploadAvatar.single('avatar'), moveAvatar, setAvatar);

module.exports = router