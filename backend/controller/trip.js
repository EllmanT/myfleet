const express = require("express");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const Trip = require("../model/trip");
const router = express.Router();

//create trip
router.post("/create-trip", async (req, res, next) => {
  try {
    const tripData = req.body;
    const trip = await Trip.create(tripData);

    res.status(201).json({
      success: true,
      trip,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = router;
