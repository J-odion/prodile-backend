const CPUschema = require("../../../models/cooperateProductiveUnit");

exports.updateCPU = async (req, res) => {
  const { id } = req.params;
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
    let userCPU = await CPUschema.findById(id);

    if (!userCPU) {
      return res.status(404).json({ msg: "CPU not found" });
    }

    console.log("CPU user ID:", userCPU.user.toString());
    console.log("Request user ID:", req.user.id);

    // Ensure the user owns the CPU
    if (userCPU.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    updRes = await CPUschema.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );

    res.status(200).json({ msg: "CPU updated successfully",  data: updRes});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
