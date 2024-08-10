// models/Resource.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgentSchema = new Schema({
  industry: {
    type: String,
    enum: [
      "Beef Production",
      "Poultry Eggs",
      "stock animals",
      "machinaries",
      "feeds",
    ],
    required: true,
  },
  name: { 
    type: String, 
    required: true 
    },
  location: { 
    type: String, 
    required: true 
    },
  entity: { 
    type: String, 
    required: true 
  },
  
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
});

module.exports = mongoose.model("Agents", AgentSchema);
