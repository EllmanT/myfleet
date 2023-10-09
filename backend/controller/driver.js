const express = require("express");
const path = require("path");
const Driver = require("../model/driver");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const fs = require("fs");
const Deliverer = require("../model/deliverer");
const { default: mongoose } = require("mongoose");

router.post(
  "/create-driver",
  upload.fields([
    { name: "license", maxCount: 1 },
    { name: "id", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const { name, phoneNumber, address, city, idNumber, companyId } =
        req.body;

      const license = req.files.license[0];
      const licenseUrl = path.join(license.path);
      const id = req.files.id[0];
      const idUrl = path.join(id.path);

      let checkDriver = await Driver.findOne({ idNumber });
      const isCompanyDeliverer = await Deliverer.findById(companyId);

      if (checkDriver) {
        //checking the deliverer table
        if (isCompanyDeliverer) {
          //check if customer already exists as a client for deliverer
          const isDeliveryDriver = isCompanyDeliverer.driver_ids.find(
            (contractor) => (contractor = checkDriver._id)
          );
          if (isDeliveryDriver) {
            const license = req.files.license;
            const licensePath = `uploads/${license}`;
            fs.unlink(licensePath, (err) => {
              if (err) {
                console.log(err);
                res.status(500).json({ message: "Error deleting file" });
              }
            });
            const id = req.files.id;
            const idPath = `uploads/${id}`;
            fs.unlink(idPath, (err) => {
              if (err) {
                console.log(err);
                res.status(500).json({ message: "Error deleting file" });
              }
            });
            return next(
              new ErrorHandler(
                `  ${checkDriver.name} is already in the system`,
                500
              )
            );
          }

          isCompanyDeliverer.driver_ids.push(checkDriver._id);
          await isCompanyDeliverer.save();
          res.status(201).json({
            success: true,

            message: "Driver added successfully",
          });
        }
      } else {
        checkDriver = await Driver.create({
          name: name,
          phoneNumber: phoneNumber,
          address: address,
          city: city,
          idNumber: idNumber,
          companyId: companyId,
          license: licenseUrl,
          id: idUrl,
        });
        //pushing the data into deliverer
        if (isCompanyDeliverer) {
          isCompanyDeliverer.driver_ids.push(checkDriver._id);
          await isCompanyDeliverer.save();
          res.status(201).json({
            success: true,
            message: "Driver created successfully",
          });
        }
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

router.get(
  "/get-all-drivers-company",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const deliverer = await Deliverer.findById(req.user.companyId);

      if (!deliverer) {
        return next(new ErrorHandler("Please login to continue", 401));
      }

      const delivererWithDrivers = await Deliverer.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.user.companyId) } },
        {
          $lookup: {
            from: "drivers",
            let: { driverIds: "$driver_ids" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$driverIds"],
                  },
                },
              },
              {
                $project: {
                  companyId: 0,
                },
              },
            ],
            as: "drivers",
          },
        },
        {
          $project: {
            drivers: 1,
          },
        },
      ]);

      if (delivererWithDrivers.length === 0) {
        res.status(201).json({
          success: true,
          message: "No drivers in the system",
        });
      }
      // Display the info about the particular drivers for the deliverer

      res.status(201).json({
        success: true,
        delivererWithDrivers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
