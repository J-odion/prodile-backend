const productiveUnit = require("../../../models/individualProductiveUnit");

exports.updateIPU = async (req, res) => {
  const { id } = req.params;
  const {
    category,
    businessName,
    entity,
    cacRegDetails,
    description,
    industry,
    website,
    deflationNumber,
    businessEmail,
    businessAddress,
    promoterFullName,
    promoterPhoneNumber,
    promoterEmail,
    promoterBVN,
    promoterNIN,
  } = req.body;

  try {
    let userIPU = await productiveUnit.findById(id);

    if (!userIPU) {
      return res.status(404).json({ msg: "Resource not found" });
    }

    console.log("Resource user ID:", userIPU.user.toString());
    console.log("Request user ID:", req.user.id);

    // Ensure the user owns the resource
    if (userIPU.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const updRes = await productiveUnit.findByIdAndUpdate(
      id,
      {
        category,
        businessName,
        entity,
        cacRegDetails,
        description,
        industry,
        website,
        deflationNumber,
        businessEmail,
        businessAddress,
        promoterFullName,
        promoterPhoneNumber,
        promoterEmail,
        promoterBVN,
        promoterNIN,
      },
      { new: true }
    );

    res.status(200).json({ msg: "Resources updated successfully", data: updRes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
