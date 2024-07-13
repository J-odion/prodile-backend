const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../../utils/sendEmail');

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
            verified: false, // Initial state
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password);

        // Generate 6-digit OTP and save to user record
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        await user.save();

        // Send OTP email
        await sendEmail(user.email, 'Email Verification', `Your OTP is ${otp}`);

        res.status(201).json({ msg: 'User registered, OTP sent to email' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
