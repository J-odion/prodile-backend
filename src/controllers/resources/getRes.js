const resources = require("../../models/resources");


//GET ALL RESOURCES
exports.getAllResources = async (req, res) => {
    try {
        const userResources = await resources.find({ user: req.user.id });
        res.status(200).json(userResources);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};