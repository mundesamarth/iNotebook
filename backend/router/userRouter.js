const express = require("express");
const bcrypt = require("bcryptjs");
const routers = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/userSchema");
const {
  userController,
  loginUser,
  sendOTP,
} = require("../controllers/userController");

routers.post(
  "/create-new-user",
  [
    body("otp")
      .isString()
      .withMessage("invalid otp")
      .isLength({ min: 6, max: 6 })
      .withMessage("invalid otp"),
    ,
    body("name")
      .isString()
      .withMessage("Invalid Name")
      .isLength({ min: 3, max: 26 })
      .withMessage("Should be min of 3 and max of 26 character"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("phone_no").isMobilePhone("en-IN").withMessage("Indian numbers only"),
    body("password")
      .isString()
      .withMessage("Invalid Password")
      .isLength({ min: 8, max: 26 })
      .withMessage("Min 8 length and max 26 length passwords"),
    body("confirm_password")
      .isString()
      .withMessage("Does not match password")
      .isLength({ min: 8, max: 26 })
      .withMessage("Does not match the password"),
  ],
  userController,
);

routers.post(
  "/login_user",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isString()
      .withMessage("Invalid Password")
      .isLength({ min: 6, max: 26 }),
  ],
  loginUser,
);

routers.post(
  "/sendOTPToEmail",
  [body("email").isEmail().withMessage("Invalid Email")],
  sendOTP,
);
module.exports = routers;
