// src/routes/profile.js
const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profileController');
const upload = require('../middleware/upload');

// @route   PUT api/profile
// @desc    Update user profile
// @access  Private
router.put('/', upload.single('profileImage'), updateProfile);

module.exports = router;
