
const productiveUnit = require("../../../models/cooperateProductiveUnit");

exports.addCPU = async (req, res) => {
  const {
    category,
    firstName,
    lastName,
    businessName,
    NIN,
    bvn,
    email,
    address,
    nextofkinFullName,
    nextofkinPhoneNumber,
    nextofkinEmail,
    nextofkinAddress,
    nextofkinRelationship,
    nextofkinOccupation,
  } = req.body;

  try {
    const newProductiveUnit = new productiveUnit({
      category,
      firstName,
      lastName,
      businessName,
      NIN,
      bvn,
      email,
      address,
      nextofkinFullName,
      nextofkinPhoneNumber,
      nextofkinEmail,
      nextofkinAddress,
      nextofkinRelationship,
      nextofkinOccupation,
      user: req.user.id,
    });

    const savedProductiveUnit = await newProductiveUnit.save();
    res.status(201).json(savedProductiveUnit);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
