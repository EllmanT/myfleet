const express = require("express");
const Path = require("path");
const Deliverer = require("../model/deliverer");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");

router.post("/create-deliverer", upload.single("file"), async (req, res, next) => {
  try {
    const {
      companyName,
      address,
      city,
      goodsType,
      vehiclesType,
      deliveryType,
    } = req.body;

    let checkCompany = await Deliverer.findOne({ companyName });

    if (checkCompany) {
      return next(new ErrorHandler("Company Exists", 400));
    }

    checkCompany = await Deliverer.create({
      companyName: companyName,
      address: address,
      city: city,
      goodsTypes: goodsType,
      vehiclesType: vehiclesType,
      deliveryType: deliveryType,
    });

    res.status(201).json({
      success: true,
      checkCompany,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = router;
