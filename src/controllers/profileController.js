// src/controllers/profileController.js
const User = require('../models/user');

exports.updateProfile = async (req, res) => {
    const { biodata, bankDetails, nextOfKin, businessCategory } = req.body;
    const profileImage = req.file ? req.file.path : null;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.biodata = biodata || user.biodata;
        user.bankDetails = bankDetails || user.bankDetails;
        user.nextOfKin = nextOfKin || user.nextOfKin;
        user.businessCategory = businessCategory || user.businessCategory;
        if (profileImage) user.profileImage = profileImage;

        await user.save();

        res.status(200).json({ msg: 'Profile updated' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
