const CPUschema = require("../../../models/cooperateProductiveUnit");


// controllers/productiveUnitController.js
exports.getCPU = async (req, res) => {
    try {
        const Units = await CPUschema.find({ user: req.user.id });
        res.status(200).json(Units);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};