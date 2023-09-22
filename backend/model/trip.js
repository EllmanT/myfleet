const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    constractorId: {
      type: String,
      required: true,
    },
    mileageOut: {
      type: String,
      required: true,
    },
    mileageIn: {
      type: String,
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    vehicleId: {
      type: String,
      required: true,
    },
    driverId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
