const express = require('express')
const userValidator = require('../../middlewares/validators/userValidator');
const signup = require('../../middlewares/routes/users/signup');
const login = require('../../middlewares/routes/users/login');
const logout = require('../../middlewares/routes/users/logout');
const auth = require('../../middlewares/auth/auth');
const getCurrentUser = require('../../middlewares/routes/users/getCurrentUser');

const router = express.Router()


router.post('/signup', userValidator, signup);

router.post('/login', userValidator, login);

router.get('/logout', auth, logout);

router.get('/current', auth, getCurrentUser);

module.exports = router