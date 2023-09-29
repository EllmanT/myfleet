const express = require("express");
const Contractor = require("../model/contractor");
const { upload } = require("../multer");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

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
        //return next(new ErrorHandler("Contractor already exists", 400));
        //checking the deliverer table
        if (isCompanyDeliverer) {
          //check if customer already exists as a client for deliverer
          const isDeliveryContractor = isCompanyDeliverer.contractors.find(
            (contractor) => (contractor = checkCompany._id)
          );
          if (isDeliveryContractor) {
            return next(
              new ErrorHandler(
                `  ${checkContractor.name} is already your contractor`,
                500
              )
            );
          }

          isCompanyDeliverer.contractors.push(checkContractor._id);
          await isCompanyContractor.save();
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
          isCompanyDeliverer.contractors.push(checkContractor._id);
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
      const contractor = await Contractor.findById(req.user.id);

      // check to see if deliverer
      if (!contractor) {
        return next(new ErrorHandler("Login Please", 401))
      }

      //2.Getting the array of the customers for the deliverer

      const delivererWithContractors = await Deliverer.aggregate([
        {
          $lookup: {
            from: "Contractors",
            localField: " contractors",
            foreignField: "_id",
            as: "Contractors",
          },
        },
        { $project: { contractors: 0 } },
      ]);
      //const delivererCustomers = await Promise.all(
      //delivererWithCustomers[0].DeliverersCustomers.map((id) => {
      //return Customer.findById(id);
      // })
      //  );

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
