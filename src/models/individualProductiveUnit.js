// models/ProductiveUnit.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IPUnitSchema = new Schema({
  category: { 
    type: String,
    enum: [
      "Beef Production",
      "Poultry Eggs",
      "stock animals",
      "machinaries",
      "feeds",
    ],
    required: true 
  },
  businessName: { 
    type: String, 
    required: true 
  },
  entity: { 
    type: String, 
    required: true 
  },
  cacRegDetails: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  industry: { 
    type: String, 
    required: true 
  },
  website: { 
    type: String, 
    required: false 
  },
  deflationNumber: { 
    type: String,
    required: true 
  },
  businessEmail: { 
    type: String, 
    required: true 
  },
  businessAddress: { 
    type: String, 
    required: true 
  },
  promoterFullName: { 
    type: String, 
    required: true 
  },
  promoterPhoneNumber: { 
    type: String, 
    required: true 
  },
  promoterEmail: { 
    type: String, 
    required: true 
  },
  promoterBVN: { 
    type: String, 
    required: true 
  },
  promoterNIN: { 
    type: String, 
    required: true 
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // Link to the User who is the promoter
});

module.exports = mongoose.model(
  "ProductiveUnit",
  IPUnitSchema
);
