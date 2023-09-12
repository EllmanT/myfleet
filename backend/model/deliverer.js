
const mongoose = require("mongoose");

const delivererSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  goodsTypes: [
    {
      type: String,
    },
  ],
});
module.exports = mongoose.model("Deliverer", delivererSchema);
``