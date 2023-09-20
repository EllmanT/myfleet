const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const ErrorHandler = require("./middleware/error");

//app. uses
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config

if (process.env.NODE_URL !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

//declaring controllers
const user = require("./controller/user");
const customer = require("./controller/customer");
const deliverer = require("./controller/deliverer");
const contractor = require("./controller/contractor");
const vehicle = require("./controller/vehicle");
const driver = require("./controller/driver");

//using controllers
app.use("/api/v2/user", user);
app.use("/api/v2/customer", customer);
app.use("/api/v2/deliverer", deliverer);
app.use("/api/v2/contractor", contractor);
app.use("/api/v2/vehicle", vehicle);
app.use("/api/v2/driver", driver);

app.use(ErrorHandler);

module.exports = app;
