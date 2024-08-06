const Resource = require('../../models/resources');

exports.addResource = async function(req, res) {
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

    console.log("got here")

    try {
        const newResource = new Resource({
            category,
            description,
            makeType,
            totalQuantity,
            pricePerKG,
            quantityAvailable,
            quantityDisbursement,
            yieldExpectation,
            beneficiary,
            user: req.user.id
        });

        const savedResource = await newResource.save();

        console.log(savedResource, " working")
        res.status(201).json(savedResource);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

