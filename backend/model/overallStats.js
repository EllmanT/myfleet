const mongoose = require("mongoose");

const overallStatsSchema = mongoose.Schema({
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
      totalProfit: Number,
      totalExpenses: Number,
      totalJobs: Number,
    },
  ],
  dailyData: [
    {
      date: String,
      totalMileage: Number,
      totalRevenue: Number,
      totalJobs: Number,
    },
  ],

  totalCustomers: {
    type: Number,
  },
  totalContractors: {
    type: Number,
  },

  revenueByContractor: {
    type: Map,
    of: Number,
  },
  jobsByContractor: {
    type: Map,
    of: Number,
  },

  companyId: { type: mongoose.Types.ObjectId, ref: "Deliverer" },
}, { timestamps: true });

module.exports = mongoose.model("overallStats", overallStatsSchema);
