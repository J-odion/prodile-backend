const CPUschema = require("../../../models/cooperateProductiveUnit");

// DELETE A RESOURCE
exports.deleteCPU = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the resource by ID
        const CPU = await CPUschema.findById(id);

        // Check if the CPU exists
        if (!CPU) {
            return res.status(404).json({ msg: 'CPU not found' });
        }

        // Ensure the user owns the CPU
        if (CPU.user.toString() !== req.user.id.toString()) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Delete the CPU
        await CPUschema.findByIdAndDelete(id);

        res.status(200).json({ msg: 'CPU deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
