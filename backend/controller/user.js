const express = require("express");
const User = require("../model/user");
const { upload } = require("multer");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");

//create-user
//create Activation Token

//activate-user

//login-user

//get-user

module.exports = router;
