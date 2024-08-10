const Agents = require("../../models/agents");

exports.addAgent = async function (req, res) {
  const { industry, name, location, entity } = req.body;

  console.log("got here");

  try {
    const newAgent = new Agents({
      industry,
      name,
      location,
      entity,
      user: req.user.id,
    });

    const savedAgent = await newAgent.save();

    console.log(savedAgent, " working");
    res.status(201).json({savedAgent,msg: "agent added suceessfully"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
