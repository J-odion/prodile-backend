const Resource = require('../../models/resources');

// DELETE A RESOURCE
exports.deleteResource = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the resource by ID
        const resource = await Resource.findById(id);

        // Check if the resource exists
        if (!resource) {
            return res.status(404).json({ msg: 'Resource not found' });
        }

        // Ensure the user owns the resource
        if (resource.user.toString() !== req.user.id.toString()) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Delete the resource
        await Resource.findByIdAndDelete(id);

        res.status(200).json({ msg: 'Resource deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
