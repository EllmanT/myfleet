const express = require("express");
const Contractor = require("../model/contractor");
const { upload } = require("../multer");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Deliverer = require("../model/deliverer");
const { default: mongoose } = require("mongoose");

router.post(
  "/create-contractor",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const {
        companyName,
        address,
        city,
        goodsTypes,
        vehiclesTypes,
        deliveryTypes,
        companyId,
      } = req.body;

      let checkCompany = await Contractor.findOne({ companyName });
      const isCompanyDeliverer = await Deliverer.findById(companyId);

      if (checkCompany) {
        //checking the deliverer table
        if (isCompanyDeliverer) {
          //check if customer already exists as a client for deliverer
          const isDeliveryContractor = isCompanyDeliverer.contractor_ids.find(
            (contractor) => (contractor = checkCompany._id)
          );
          if (isDeliveryContractor) {
            return next(
              new ErrorHandler(
                `  ${checkCompany.name} is already your contractor`,
                500
              )
            );
          }

          isCompanyDeliverer.contractor_ids.push(checkCompany._id);
          await isCompanyDeliverer.save();
          res.status(201).json({
            success: true,

            message: "Contractor added successfully",
          });
        }
      } else {
        checkCompany = await Contractor.create({
          companyName: companyName,
          address: address,
          city: city,
          goodsTypes: goodsTypes,
          vehiclesTypes: vehiclesTypes,
          deliveryTypes: deliveryTypes,
        });
        //pushing the data into deliverer
        if (isCompanyDeliverer) {
          isCompanyDeliverer.contractor_ids.push(checkCompany._id);
          await isCompanyDeliverer.save();
          res.status(201).json({
            success: true,
            message: "Contractor created successfully",
          });
        }

        res.status(201).json({
          success: true,
          checkCompany,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get all contractors for deliverer
router.get(
  "/get-all-contractors-deliverer",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      //1. find out if the user is deliverer or supplier
      const deliverer = await Deliverer.findById(req.user.companyId);
      // check to see if deliverer
      if (!deliverer) {
        return next(new ErrorHandler("Login Pleaseee", 401));
      }

      //2.Getting the array of the customers for the deliverer

      const delivererWithContractors = await Deliverer.aggregate([
        //get only information about the one deliverer
        {
          $match: { _id: new mongoose.Types.ObjectId(req.user.companyId) },
        },
        {
          $lookup: {
            from: "contractors",
            let: { contractorIds: "$contractor_ids" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$contractorIds"],
                  },
                },
              },
              {
                $project: {
                  rates: 0,
                  customers: 0,
                },
              },
            ],
            as: "contractors",
          },
        },
        {
          $project: {
            contractors: 1,
          },
        },
      ]);
      //.then((result) => {
      // if (result.length === 0) {
      // res.status(201).json({
      // success: true,
      //message: "No results ",
      //});
      // }
      //});
      if (delivererWithContractors.length === 0) {
        res.status(201).json({
          success: false,
          message: "no results",
        });
      }
      res.status(201).json({
        success: true,
        delivererWithContractors,
      });
      // Display the info about the particular customers for the deliverer
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
