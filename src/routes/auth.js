const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// @route   POST api/auth/signup
// @desc    Register user
// @access  Public
router.post('/signup', signup);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

const { requestPasswordReset, resetPassword } = require('../controllers/authController');

// @route   POST api/auth/request-password-reset
// @desc    Request password reset
// @access  Public
router.post('/request-password-reset', requestPasswordReset);

// @route   POST api/auth/reset-password/:token
// @desc    Reset password
// @access  Public
router.post('/reset-password/:token', resetPassword);

const { sendVerificationEmail, verifyEmail } = require('../controllers/authController');

// @route   POST api/auth/send-verification-email
// @desc    Send verification email
// @access  Public
router.post('/send-verification-email', sendVerificationEmail);

// @route   GET api/auth/verify-email/:token
// @desc    Verify email
// @access  Public
router.get('/verify-email/:token', verifyEmail);

module.exports = router;
