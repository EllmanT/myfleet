const express = require("express");
const Customer = require("../model/customer");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const Deliverer = require("../model/deliverer");
const Contractor = require("../model/contractor");
const { isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const mongoose = require("mongoose");
//create customer
router.post(
  "/create-customer",

  upload.single("file"),
  async (req, res, next) => {
    try {
      const { name, phoneNumber, address, city, companyId } = req.body;
      let checkCustomer = await Customer.findOne({ name });

      const isCompanyDeliverer = await Deliverer.findById(companyId);

      const isCompanyContractor = await Contractor.findById(companyId);

      if (checkCustomer) {
        //checking to see if customer exists in the deliverers customers array list
        //we dont want to add duplicate customers into the deliverers array list

        //checking the deliverer table
        if (isCompanyDeliverer) {
          //check if customer already exists as a client for deliverer
          const isDeliveryCustomer = isCompanyDeliverer.customer_ids.find(
            (customer) => (customer = checkCustomer._id)
          );
          if (isDeliveryCustomer) {
            return next(
              new ErrorHandler(
                `  ${checkCustomer.name} is already your customer`,
                500
              )
            );
          }

          isCompanyDeliverer.customer_ids.push(checkCustomer._id);
          await isCompanyDeliverer.save();
          res.status(201).json({
            success: true,

            message: "Customer added successfully",
          });
        } else {
          //check if customer already exists as a client for contractor
          if (isCompanyContractor) {
            isContractorCustomer = isCompanyContractor.customer_ids.find(
              (customer) => customer === checkCustomer._id
            );
            if (isContractorCustomer) {
              return next(
                new ErrorHandler(
                  `${checkCustomer.name} is already your customer`,
                  500
                )
              );
            }
            isCompanyContractor.customer_ids.push(checkCustomer._id);
            await isCompanyContractor.save();
            res.status(201).json({
              success: true,
              message: "Customer added successfully",
            });
          }
        }

        //return next(new ErrorHandler("The customer already exists", 400));
      } else {
        checkCustomer = await Customer.create({
          name: name,
          phoneNumber: phoneNumber,
          city: city,
          address: address,
        });

        //pushing the data into deliverer
        if (isCompanyDeliverer) {
          isCompanyDeliverer.customer_ids.push(checkCustomer._id);
          await isCompanyDeliverer.save();
          res.status(201).json({
            success: true,
            message: "User created successfully",
          });
        } else {
          //pushing the data into the contractor
          if (isCompanyContractor) {
            isCompanyContractor.customer_ids.push(checkCustomer._id);
            await isCompanyContractor.save();
            res.status(201).json({
              success: true,
              message: "User created successfully",
            });
          }
        }
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get all customers for deliverer
router.get(
  "/get-all-customers-company",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      //1. find out if the user is deliverer or supplier
      const deliverer = await Deliverer.findById(req.user.companyId);

      // check to see if deliverer
      if (!deliverer) {
        // const contractor = await Contractor.findById(req.user.id);
        return next(new ErrorHandler("Herer we are", 400));
      }

      //2.Getting the array of the customers for the deliverer

      const delivererWithCustomers = await Deliverer.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.user.companyId) } },

        {
          $lookup: {
            from: "customers",
            let: { customerIds: "$customer_ids" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$customerIds"],
                  },
                },
              },
              {
                $project: {
                  _id:1,
                  name: 1,
                  city: 1,
                  phoneNumber: 1,
                  address: 1,
                },
              },
            ],
            as: "customers",
          },
        },

        {
          $project: {
            customers: 1,
          },
        },
      ]).then((result) => {
        if (result.length === 0) {
          return "No results to show";
        }
        res.status(201).json({
          success: true,
          result,
        });
      });

      // Display the info about the particular customers for the deliverer
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
