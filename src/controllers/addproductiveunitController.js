// controllers/productiveUnitController.js
// const ProductiveUnit = require('../models/ProductiveUnit');

const productiveUnit = require("../models/productiveUnit");

exports.addProductiveUnit = async (req, res) => {
    const {
        category, businessName, entity, cacRegDetails, description,
        industry, website, deflationNumber, businessEmail, businessAddress,
        promoterFullName, promoterPhoneNumber, promoterEmail, promoterBVN, promoterNIN
    } = req.body;

    try {
        const newProductiveUnit = new productiveUnit({
            category, businessName, entity, cacRegDetails, description,
            industry, website, deflationNumber, businessEmail, businessAddress,
            promoterFullName, promoterPhoneNumber, promoterEmail, promoterBVN, promoterNIN,
            user: req.user.id 
        });

        const savedProductiveUnit = await newProductiveUnit.save();
        res.status(201).json(savedProductiveUnit);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


