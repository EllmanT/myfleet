const express = require("express");
const User = require("../model/user");
const { upload } = require("../multer");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const deliverer = require("../model/deliverer");
const { useReducer } = require("react");
const { isAuthenticated } = require("../middleware/auth");

//create-user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      companyId,
      role,
      address,
      city,
      password,
    } = req.body;
    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return new ErrorHandler("The user already exists", 400);
    }

    const user = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      companyId: companyId,
      role: role,
      address: address,
      city: city,
      password: password,
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate Account!",
        message: `Hi ${user.name}. Please click the link to activate your account : ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Check your email to finish verification : ${user.email} `,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
//create Activation Token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET);
};

//activate-user

router.post(
  `/activate-deliverer`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const checkToken = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!checkToken) {
        return next(new ErrorHandler("Token is invalid", 400));
      }

      const { name, email, phoneNumber, password, address, city, role } =
        checkToken;

      let user = await User.findOne({ email });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

//login-user

router.post(
  `/login-user`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checkEmail = await User.findOne({ email }).select("+password");
      if (!email || password) {
        return next(new ErrorHandler("Enter all the fields", 400));
      }
      if (!checkEmail) {
        return new new ErrorHandler("User doesnt exist", 400)();
      }

      verifyPassword = await checkEmail.comparePassword(password);
      if (!verifyPassword) {
        return next(new ErrorHandler("Enter correct info", 400));
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

//get-user
router.get(
  "/get-user",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("Login to continue", 400));
      }
      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
