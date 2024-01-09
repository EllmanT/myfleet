const mongoose = require("mongoose");

const employeeExpenseSchema = new mongoose.Schema(
  {
    employeeId: {
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
        vehicleId: String,
        cost: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("employeeExpense", employeeExpenseSchema);
