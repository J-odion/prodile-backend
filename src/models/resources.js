// models/Resource.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  category: {
    type: String,
    enum: [
      "seedlings",
      "fertilizers",
      "chemicals",
      "stock animals",
      "machinaries",
      "feeds",
    ],
    required: true,
  },
  description: { 
    type: String, 
    required: true 
    },
  makeType: { 
    type: String, 
    required: true 
    },
  totalQuantity: { 
    type: Number, 
    required: true 
  },
  pricePerKG: { 
    type: Number, 
    required: true 

  },
  quantityAvailable: { 
    type: Number, 
    required: true 

  },
  quantityDisbursement: { 
    type: Number, 
    required: true 

  },
  yieldExpectation: { 
    type: String, 
    required: true 

  },
  beneficiary: { 
    type: String, 
    required: true 

  },
  totalPrice: {
    type: Number,
    default: function () {
      return this.totalQuantity * this.pricePerKG;
    },
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 

  },
});

module.exports = mongoose.model("Resource", ResourceSchema);
