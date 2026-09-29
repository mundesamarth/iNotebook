const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/userSchema");
const sendOTPToEmail = require("../services/otpGenerator");
const OTPModel = require("../models/OTPModel");

const  jwt = require("jsonwebtoken");
const userController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
      return res.status(400).json({
        message: "Something went wrong gang",
        errors: errors.array(),
        success: false,
      });
    }

    const { name, email, phone_no, password, confirm_password } = req.body;

    const exist_otp = await OTPModel.findOne({ email: req.body.email })
      .sort({ _id: -1 })
      .limit(1);

    if (exist_otp.otp_code !== req.body.otp) {
      return res
        .status(400)
        .json({ message: "Invalid Authentication", success: false });
    }

    if (exist_otp.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid Authentication", success: false });
    }
    let entrydate = new Date(exist_otp.createdAt);

    entrydate = entrydate.getTime() + 10 * 60 * 1000;

    let currectTime = new Date().getTime();

    if (currectTime > entrydate) {
      return res.status(400).json({ message: "OTP Expired", success: false });
    }
    const exist_email = await userModel.findOne({ email: email });

    if (exist_email) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }

    const exist_phone_no = await userModel.findOne({ phone_no: phone_no });

    if (exist_phone_no) {
      return res
        .status(400)
        .json({ message: "Phone number already exists", success: false });
    }

    if (password !== confirm_password) {
      return res
        .status(400)
        .json({ message: "Password does not match", success: false });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      phone_no: req.body.phone_no,
      password: hash,
    });

    await newUser.save();
    console.log("User have been successfully added gang");
    return res.status(200).json({
      message: "Data has been added gang",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while adding data gang",
      error: error,
      success: false,
    });
  }
};



const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
      return res.status(400).json({
        message: "Validation Errors at Login User",
        status: false,
      });
    }

    const exist_email = await userModel.findOne({ email: req.body.email });

    if (!exist_email) {
      return res
        .status(400)
        .json({ message: "Email does not exists gang", status: false });
    }

    const flag = bcrypt.compareSync(req.body.password, exist_email.password);

    if (!flag) {
      return res.status(400).json({ message: "Wrong Password", status: false });
    }

    const token = jwt.sign(
      {
        _id: exist_email._id,
        email: exist_email.email,
        phone_no: exist_email.email,
      },
      process.env.KEY,
    );

    return res
      .status(200)
      .json({ message: "Login Successful", success: true, token: token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Interval server error at login User", status: false });
  }
};

const sendOTP = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
      console.log(errors);
      return res.status(400).json({
        message: "Validation Errors at sending OTP",
        status: false,
      });
    }

    await sendOTPToEmail(req.body.email);

    return res
      .status(200)
      .json({ message: "OTP sent successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error at yser controller ", success: false });
  }
};
module.exports = { userController, loginUser, sendOTP };
