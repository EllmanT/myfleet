const mongoose = require("mongoose");

const delivererSchema = new mongoose.Schema(
  {
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
    goodsType: [
      {
        type: String,
        required: true,
      },
    ],

    vehiclesType: [
      {
        type: String,
        required: true,
      },
    ],
    deliveryType: [
      {
        type: String,
        required: true,
      },
    ],
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
    customers: {
      type: [mongoose.Types.ObjectId],
      ref: "Customer",
    },
    contractors: {
      type: [mongoose.Types.ObjectId],
      ref: "Contractor",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Deliverer", delivererSchema);
``;
