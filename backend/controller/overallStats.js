const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const OverallStats = require("../model/overallStats");
const Contractor = require("../model/contractor");
const router = express.Router();

//getting all the overall stats info 
router.get(
  "/get-all-overallStats-company",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const delivererWithOverallStats = await OverallStats.findOne(
        { companyId: req.user.companyId },
      );

      if (!delivererWithOverallStats) {
        return next(new ErrorHandler("Can't find deliverer", 400));
      } else {

        res.status(201).json({
          success: true,
          delivererWithOverallStats,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/get-total-jobs-overallStats-company",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const delivererWithOverallStatstj = await OverallStats.findOne(
        { companyId: req.user.companyId },
        { jobsByContractor: 1 } // Specify the fields to include in the resultc
      );

      if (!delivererWithOverallStatstj) {
        return next(new ErrorHandler("Can't find deliverer", 400));
      } else {
        console.log(delivererWithOverallStatstj);

        res.status(201).json({
          success: true,
          jobsByContractor: delivererWithOverallStatstj.jobsByContractor, // Return the jobsByCategory array
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/get-total-rev-overallStats-company",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const delivererWithOverallStats = await OverallStats.findOne(
        { companyId: req.user.companyId },
        { revenueByContractor: 1 } // Specify the fields to include in the result
      );

      if (!delivererWithOverallStats) {
        return next(new ErrorHandler("Can't find deliverer", 400));
      } else {
        console.log(delivererWithOverallStats);

        res.status(201).json({
          success: true,
          jobsByCategory: delivererWithOverallStats.jobsByCategory, // Return the jobsByCategory array
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
