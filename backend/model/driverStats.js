const mongoose = require("mongoose");

const DriverStatsSchema = new mongoose.Schema({
  driverId: String,
  yearlyJobs: {
    type: Number,
  },
  yearlyMileage: {
    type: Number,
  },
  yearlyRevenue: {
    type: Number,
  },
  yearlyExpenses: {
    type: Number,
  },
  yearlyProfit: {
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
      totalExpenses: Number,
      totalProfit: Number,
      totalJobs: Number,
    },
  ],
  dailyData: [
    {
      date: String,
      totalJobs: Number,
      totalMileage: Number,
      totalRevenue: Number,
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
}, { timestamps: true });

module.exports = mongoose.model("DriverStats", DriverStatsSchema);
