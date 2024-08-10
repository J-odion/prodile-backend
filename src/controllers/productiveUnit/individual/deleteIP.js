const productiveUnit = require("../../../models/individualProductiveUnit");

// DELETE A RESOURCE
exports.deleteIPU = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the resource by ID
    const IPU = await productiveUnit.findById(id);

    // Check if the resource exists
    if (!IPU) {
      return res.status(404).json({ msg: "IPU Unit not found" });
    }

    // Ensure the user owns the resource
    if (IPU.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Delete the resource
    await productiveUnit.findByIdAndDelete(id);

    res.status(200).json({ msg: "IPU unit deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
