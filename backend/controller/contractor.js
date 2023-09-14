const express = require("express");
const Contractor = require("../model/contractor");
const { upload } = require("../multer");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

router.post(
  "/create-contractor",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const { companyName, address, city, goodsType } = req.body;

      let checkCompany = await Contractor.findOne({ companyName });

      if (checkCompany) {
        return next(new ErrorHandler("Contractor already exists", 400));
      }

      checkCompany = await Contractor.create({
        companyName: companyName,
        address: address,
        city: city,
        goodsType,
      });
      res.status(201).json({
        success: true,
        checkCompany,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

module.exports = router;
