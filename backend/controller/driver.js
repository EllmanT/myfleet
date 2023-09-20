const express = require("express");
const path = require("path");
const Driver = require("../model/driver");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const fs = require("fs");

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

      let addDriver = await Driver.findOne({ idNumber });

      if (addDriver) {
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
        return next(new ErrorHandler("Driver exists", 400));
      }
      const license = req.files.license[0];
      const licenseUrl = path.join(license.path);
      const id = req.files.id[0];
      const idUrl = path.join(id.path);
      addDriver = await Driver.create({
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        city: city,
        idNumber: idNumber,
        companyId: companyId,
        license: licenseUrl,
        id: idUrl,
      });
      res.status(201).json({
        success: true,
        Driver,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

module.exports = router;
