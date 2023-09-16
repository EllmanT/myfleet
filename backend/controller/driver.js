const express = require("express");
const path = require("path");
const Driver = require("../model/driver");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const fs = require("fs")

router.post("/create-driver", upload.single("file"), async (req, res, next) => {
  try {
    const { name, phoneNumber, address, city, idNumber } = req.body;

    let Driver = await Driver.findOne({ idNumber });
    if (Driver) {
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Error deleting file" });
          }
        });
      return next(new ErrorHandler("Driver exists", 400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    checkDriver = await Driver.create({
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      city: city,
      idNumber: idNumber,
      licence: fileUrl,
    });
    res.status(201).json({
      success: true,
      Driver,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
