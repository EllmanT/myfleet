const express = require("express");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const Vehicle = require("../model/vehicle");
const router = express.Router();

router.post(
  "/create-vehicle",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const { make, regNumber, size, companyId } = req.body;

      let checkVehicle = await Vehicle.findOne({ regNumber });

      if (checkVehicle) {
        return new ErrorHandler("Vehicle already exists", 400);
      }
      checkVehicle = await Vehicle.create({
        make: make,
        regNubmber: regNumber,
        size: size,
        compnayId: companyId,
      });
      res.status(201).json({
        success: false,
        checkVehicle,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
