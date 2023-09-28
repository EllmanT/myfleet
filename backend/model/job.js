const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
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
    delivererId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
