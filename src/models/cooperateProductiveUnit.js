// models/ProductiveUnit.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CPUSchema = new Schema({
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
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  businessName: { 
    type: String, 
    required: true 
  },
  NIN: { 
    type: String, 
    required: true 
  },
  bvn: { 
    type: String, 
    required: true 
  }, 
  email: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  nextofkinFullName: { 
    type: String, 
    required: true 
  },
  nextofkinPhoneNumber: { 
    type: String, 
    required: true 
  },
  nextofkinEmail: { 
    type: String, 
    required: true 
  },
  nextofkinAddress: { 
    type: String, 
    required: true 
  },
  nextofkinRelationship: { 
    type: String, 
    required: true 
  },
  nextofkinOccupation: { 
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
  "CPUschema",
  CPUSchema
);
