const User = require('../../models/user');
const sendEmail = require('../../utils/sendEmail');
const crypto = require('crypto');

exports.resendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        let user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        await user.save();

        // Send OTP email
        await sendEmail(user.email, 'Email Verification', `Your OTP is ${otp}`);

        res.status(200).json({ msg: 'OTP resent to email' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
