const express = require("express");
const Customer = require("../model/customer");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const router = express.Router();

//create customer
router.post(
  "/create-customer",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const { name, phoneNumber, address, city } = req.body;
      let checkCustomer = await Customer.findOne({ name });
      if (checkCustomer) {
        return next(new ErrorHandler("The customer already exists", 400));
      }

      checkCustomer = await Customer.create({
        name: name,
        phoneNumber: phoneNumber,
        city: city,
        address: address,
      });

      res.status(201).json({
        success: true,
        message: "User created successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

module.exports = router;
