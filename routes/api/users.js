const express = require('express')
const signup = require('../../middlewares/routes/users/signup');
const userValidator = require('../../middlewares/validators/userValidator');

const router = express.Router()

router.post('/signup', userValidator, signup);

module.exports = router