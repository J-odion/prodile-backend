const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const productiveUnitRoutes = require('./productiveUnit');
const resourceRoutes = require('./resources');

router.use('/auth', authRoutes);
router.use('/productive-units', productiveUnitRoutes);
router.use('/resources', resourceRoutes);

module.exports = router;
