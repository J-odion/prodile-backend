const User = require('../../models/user');

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ msg: 'Invalid OTP' });
        }

        user.isVerified = true;
        user.otp = undefined; // Clear the OTP after verification
        await user.save();

        res.status(200).json({ msg: 'User verified successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
