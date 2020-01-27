const express = require('express');
const {
	register,
	login,
	logout,
	forgotPassword,
    resetPassword,
    socialLogin
} = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { userRegisterValidator, passwordResetValidator } = require('../validator');

const router = express.Router();

router.post('/register', userRegisterValidator, register);
router.post('/login', login);
router.get('/logout', logout);

router.post("/social-login", socialLogin); 

//forgot password and reset password
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', passwordResetValidator, resetPassword);

//any route containing :userId, our app will first execute userById()
router.param('userId', userById);

module.exports = router;
