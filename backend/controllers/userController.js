const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/userSchema");
const sendOTPToEmail = require("../services/otpGenerator");
const OTPModel = require("../models/OTPModel");

const jwt = require("jsonwebtoken");
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

    const { name, email, phonenumber, password, confirmPassword } = req.body;

    const exist_otp = await OTPModel.findOne({ email: req.body.email })
      .sort({ _id: -1 })
      .limit(1);

    if (!exist_otp) {
      return res
        .status(400)
        .json({ message: "OTP Code Expired ", success: false });
    }

    if (exist_otp.attempts >= 5) {
      await OTPModel.deleteOne({ _id: exist_otp._id });
      return res.status(429).json({
        message: "Too many OTP attempts",
        success: false,
      });
    }
    if (exist_otp.otp_code !== req.body.otp) {
      exist_otp.attempts += 1;
      await exist_otp.save();
      return res
        .status(400)
        .json({ message: "Wrong Verification Code", success: false });
    }

    let entrydate = new Date(exist_otp.createdAt);

    entrydate = entrydate.getTime() + 10 * 60 * 1000;

    let currectTime = new Date().getTime();

    if (currectTime > entrydate) {
      await OTPModel.deleteMany({ email: req.body.email });
      return res.status(400).json({ message: "OTP Expired", success: false });
    }
    const exist_email = await userModel.findOne({ email: email });

    if (exist_email) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }

    const exist_phone_no = await userModel.findOne({
      phonenumber: phonenumber,
    });

    if (exist_phone_no) {
      return res
        .status(400)
        .json({ message: "Phone number already exists", success: false });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password does not match", success: false });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      password: hash,
    });

    await newUser.save();
    await OTPModel.deleteMany({ email: req.body.email });
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
        .json({
          message: "Email does not exists ",
          status: false,
          code: "EMAIL_NOT_FOUND",
        });
    }

    const flag = bcrypt.compareSync(req.body.password, exist_email.password);

    if (!flag) {
      return res
        .status(400)
        .json({
          message: "Wrong Password",
          code: "INVALID_PASSWORD",
          status: false,
        });
    }

    const token = jwt.sign(
      {
        _id: exist_email._id,
        email: exist_email.email,
        phonenumber: exist_email.phonenumber,
      },
      process.env.KEY,
      { expiresIn: "1d" },
    );

    return res
      .status(200)
      .json({ message: "Login Successful", success: true, token: token });
  } catch (error) {
    console.error("Login failed:", error);

    return res.status(500).json({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to sign in right now. Please try again later.",
    });
  }
};

const sendOTPController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
      console.log(errors);
      return res.status(400).json({
        message: "Validation Errors at sending OTP",
        status: false,
      });
    }
    const lastOtp = await OTPModel.findOne({ email: req.body.email }).sort({
      createdAt: -1,
    });

    if (lastOtp) {
      const timePassed = Date.now() - new Date(lastOtp.createdAt).getTime();

      if (timePassed < 60 * 1000) {
        return res.status(429).json({
          message: "Please wait before requesting another OTP",
          success: false,
        });
      }
    }

    const findEmail = await userModel.findOne({ email: req.body.email });

    if (findEmail) {
      return res.status(400).json({
        message: "Email Address already exists, please sign in",
        success: false,
      });
    }

    await sendOTPToEmail(req.body.email);

    return res
      .status(200)
      .json({ message: "OTP sent successfully", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error at OTP controller ",
      success: false,
    });
  }
};
module.exports = { userController, loginUser, sendOTPController };
