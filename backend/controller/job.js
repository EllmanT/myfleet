const express = require("express");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const Job = require("../model/job");
const router = express.Router();

//create trip
router.post("/create-job", async (req, res, next) => {
  try {
    const jobData = req.body;
    const trip = await Job.create(jobData);

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = router;
