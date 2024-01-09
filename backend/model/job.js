const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobNumber: {
      type: String,
      required: true,
      
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
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
    deliveryType:{
      type:String,
      required:true,
    },
   
    contractorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contractor",
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "driver",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
