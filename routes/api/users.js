const express = require('express')
const userValidator = require('../../middlewares/validators/userValidator');
const signup = require('../../middlewares/routes/users/signup');
const login = require('../../middlewares/routes/users/login');

const router = express.Router()


router.post('/signup', userValidator, signup);

router.post('/login', userValidator, login);

module.exports = router