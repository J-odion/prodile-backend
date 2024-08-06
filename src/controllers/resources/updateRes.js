const Resource = require('../../models/resources');

exports.updateResource = async (req, res) => {
    const { id } = req.params;
    const {
        category,
        description,
        makeType,
        totalQuantity,
        pricePerKG, 
        quantityAvailable,
        quantityDisbursement,
        yieldExpectation,
        beneficiary
    } = req.body;

    try {
        let userResource = await Resource.findById(id);

        if (!userResource) {
            return res.status(404).json({ msg: 'Resource not found' });
        }

        console.log('Resource user ID:', userResource.user.toString());
        console.log('Request user ID:', req.user.id);

        // Ensure the user owns the resource
        if (userResource.user.toString() !== req.user.id ) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        updRes = await Resource.findByIdAndUpdate(
            id,
            { category, description, makeType, totalQuantity, pricePerKG, quantityAvailable, quantityDisbursement, yieldExpectation, beneficiary },
            { new: true }
        );

        res.status(200).json({msg: 'Resources updated successfully'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
