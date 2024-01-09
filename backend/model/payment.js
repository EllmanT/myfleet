const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
    },
    contractorId: {
      type: mongoose.Types.ObjectId,
    },
    amount: {
      type: Number,
    },
    description: {
      type: String,
    },
    year: {
      type: String,
    },
    month: {
      type: String,
    },
    paymentDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.export = mongoose.model("paymentSchema", paymentSchema);
