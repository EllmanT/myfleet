const express = require("express");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const Vehicle = require("../model/vehicle");
const { isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Deliverer = require("../model/deliverer");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.post(
  "/create-vehicle",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const { make, regNumber, size, companyId } = req.body;

      let checkVehicle = await Vehicle.findOne({ regNumber });

      const isCompanyDeliverer = await Deliverer.findById(companyId);

      if (checkVehicle) {
        //checking to see if customer exists in the deliverers customers array list
        //we dont want to add duplicate customers into the deliverers array list

        //checking the deliverer table
        if (isCompanyDeliverer) {
          //check if customer already exists as a client for deliverer
          const isDeliveryVehicle = isCompanyDeliverer.vehicle_ids.find(
            (customer) => (customer = checkVehicle._id)
          );
          if (isDeliveryVehicle) {
            return next(
              new ErrorHandler(
                `${checkVehicle.make}   ${checkVehicle.regNumber} is already in the system`,
                500
              )
            );
          }

          isCompanyDeliverer.vehicle_ids.push(checkVehicle._id);
          await isCompanyDeliverer.save();
          res.status(201).json({
            success: true,

            message: "Vehicle added successfully",
          });
        }

        //return next(new ErrorHandler("The customer already exists", 400));
      } else {
        checkVehicle = await Vehicle.create({
          make: make,
          regNumber: regNumber,
          size: size,
          companyId: companyId,
        });
        //pushing the data into deliverer
        if (isCompanyDeliverer) {
          isCompanyDeliverer.vehicle_ids.push(checkVehicle._id);
          await isCompanyDeliverer.save();
          res.status(201).json({
            success: true,
            message: "Vehicle added successfully",
          });
        }
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get the vehicles for the deliverer

router.get(
  "/get-all-vehicles-company",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const deliverer = await Deliverer.findById(req.user.companyId);

      if (!deliverer) {
        return next(new ErrorHandler("Login Please", 401));
      }

      const delivererWithVehicles = await Deliverer.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.user.companyId) } },
        {
          $lookup: {
            from: "vehicles",
            let: { vehicleIds: "$vehicle_ids" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$vehicleIds"],
                  },
                },
              },
              {
                $project: {
                  companyId: 0,
                },
              },
            ],
            as: "vehicles",
          },
        },
        {
          $project: {
            vehicles: 1,
          },
        },
      ]);

      if (delivererWithVehicles.length === 0) {
        res.status(201).json({
          success: true,
          message: "No vehicles in the system",
        });
      }

      res.status(201).json({
        success: true,
        delivererWithVehicles,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
