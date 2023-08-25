const express = require("express");
const Path = require("path");
const User = require("../model/user");
const { upload } = require("../multer");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/auth");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return next(new ErrorHandler("User exists", 400));
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    const activationToken = createActivation(user);
    const activation_url = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account!",
        message: `Hi ${user.name}. Follow the link to activate account : ${activation_url} `,
      });

      res.status(201).json({
        success: true,
        message: `Check your email : ${user.email}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//create Activation function
const createActivation = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};
//activation of user

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const checkToken = await jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!checkToken) {
        return next(new ErrorHandler("The Token has expired", 400));
      }

      const { name, email, password } = checkToken;
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("The user exists", 400));
      }
      user = await User.create({
        name: name,
        email: email,
        password: password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//login user

router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Enter all fields", 400));
      }
      const check = await User.findOne({ email });
      if (!check) {
        return next(new ErrorHandler("The user does not exist", 400));
      }

      sendToken(check, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get user

router.get(
  "/get-user",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User doesnt exist", 400));
      }
      res.status(200).json({  
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
