const productiveUnit = require("../models/individualProductiveUnit");


// controllers/productiveUnitController.js
exports.getAllProductiveUnits = async (req, res) => {
    try {
        const Units = await productiveUnit.find({ user: req.user.id });
        res.status(200).json(Units);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};