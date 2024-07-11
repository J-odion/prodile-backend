
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');


exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpire = resetPasswordExpire;
        await user.save();

        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message,
        });

        res.status(200).json({ msg: 'Email sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.resetPassword = async (req, res) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    try {
        let user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid token' });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.sendVerificationEmail = async (req, res) => {
    const { email } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const verificationToken = crypto.randomBytes(20).toString('hex');
        const emailVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
        user.emailVerificationToken = emailVerificationToken;
        await user.save();

        const verifyUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;

        const message = `You are receiving this email because you (or someone else) has requested to verify your email. Please click the following link to verify your email: \n\n ${verifyUrl}`;

        await sendEmail({
            email: user.email,
            subject: 'Email Verification',
            message,
        });

        res.status(200).json({ msg: 'Email sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.verifyEmail = async (req, res) => {
    const emailVerificationToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    try {
        let user = await User.findOne({
            emailVerificationToken,
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid token' });
        }

        user.isVerified = true;
        user.emailVerificationToken = undefined;
        await user.save();

        res.status(200).json({ msg: 'Email verified' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};