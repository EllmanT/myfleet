const mongoose = require("mongoose");

const VehicleStatsSchema = new mongoose.Schema(
  {
    vehicleId: String,
    yearlyJobs: {
      type: Number,
    },
    yearlyMileage: {
      type: Number,
    },
    yearlyRevenue: {
      type: Number,
    },
    yearlyProfit: {
      type: Number,
    },
    yearlyExpenses: {
      type: Number,
    },
    year: {
      type: Number,
    },
    monthlyData: [
      {
        month: String,
        totalMileage: Number,
        totalRevenue: Number,
        totalProfit: Number,
        totalJobs: Number,
        totalExpenses: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalMileage: Number,
        totalRevenue: Number,
        totalJobs: Number,
        totalExpenses: Number,
      },
    ],

    revenueByContractor: {
      type: Map,
      of: Number,
    },
    jobsByContractor: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VehicleStats", VehicleStatsSchema);
