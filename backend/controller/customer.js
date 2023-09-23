const express = require("express");
const Customer = require("../model/customer");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const Deliverer = require("../model/deliverer");
const Contractor = require("../model/contractor");
const { isAuthenticated } = require("../middleware/auth");
const customer = require("../model/customer");
const router = express.Router();

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
          const isDeliveryCustomer = isCompanyDeliverer.customers.find(
            (customer) => customer = checkCustomer._id
          );
          if (isDeliveryCustomer) {
            return next(
              new ErrorHandler(
                `  ${checkCustomer.name} is already your customer`,
                500
              )
            );
          }

          isCompanyDeliverer.customers.push(checkCustomer._id);
          await isCompanyDeliverer.save();
          res.status(201).json({
            success: true,

            message: "Customer added successfully",
          });
        } else {
          //check if customer already exists as a client for contractor
          if (isCompanyContractor) {
            isContractorCustomer = isCompanyContractor.customers.find(
              (customer) => customer === checkCustomer._id
            );
            if (isContractorCustomer) {
              return next(new ErrorHandler(`${checkCustomer.name} is already your customer`, 500));
            }
            isCompanyContractor.customers.push(checkCustomer._id);
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
          isCompanyDeliverer.customers.push(checkCustomer._id);
          await isCompanyDeliverer.save();
          res.status(201).json({
            success: true,
            message: "User created successfully",
          });
        } else {
          //pushing the data into the contractor
          if (isCompanyContractor) {
            isCompanyContractor.customers.push(checkCustomer._id);
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

//get user
router.post("/get-customers-deliverer/:id")

module.exports = router;
