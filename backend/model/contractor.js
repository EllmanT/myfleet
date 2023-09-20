const mongoose = require("mongoose");

const contractorSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  Rates: [
    {
      rateType: {
        type: String,
      },
      smallVehicle: {
        type: Number,
      },
      mediumVehicle: {
        type: Number,
      },
      largeVehicle: {
        type: Number,
      },
    },
  ],

  goodsTypes: [
    {
      type: String,
    },
  ],
  vehiclesTypes: [
    {
      type: String,
    },
  ],
  deliveryTypes: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Contractor", contractorSchema);
``;
