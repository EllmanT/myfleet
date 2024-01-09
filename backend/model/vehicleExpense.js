const mongoose = require("mongoose");

const VehicleExpenseSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
    },

    expenseData: [
      {
        date: String,
        description: String,
        employeeId: String,
        cost: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("VehicleExpense", VehicleExpenseSchema);
