const OTPModel = require("../models/OTPModel");
const transporter = require("./nodemailer");

function generateSixDigitCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

const sendOTPToEmail = async (email, req, res) => {
  try {
    if (typeof email === "undefined" || typeof email === "") {
      return res
        .status(400)
        .json({ message: "Invalid email 123", success: false });
    }

    const otp = generateSixDigitCode();

    const info = await transporter.sendMail({
      from: `"OTP INotebook" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "OTP to verify Inotebook",
      html: ` <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your OTP Code</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f7fb;
      font-family: Arial, Helvetica, sans-serif;
      color: #222;
    }

    .email-wrapper {
      width: 100%;
      padding: 40px 0;
      background-color: #f4f7fb;
    }

    .email-container {
      max-width: 560px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }

    .header {
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      padding: 35px 25px;
      text-align: center;
      color: #ffffff;
    }

    .header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .header p {
      margin: 10px 0 0;
      font-size: 15px;
      opacity: 0.95;
    }

    .content {
      padding: 35px 30px;
      text-align: center;
    }

    .content h2 {
      margin: 0 0 12px;
      font-size: 22px;
      color: #111827;
    }

    .content p {
      margin: 0 auto 24px;
      font-size: 15px;
      line-height: 1.7;
      color: #5f6b7a;
      max-width: 420px;
    }

    .otp-box {
      display: inline-block;
      background-color: #f1f5ff;
      border: 1px dashed #2563eb;
      border-radius: 14px;
      padding: 18px 30px;
      margin: 10px 0 25px;
    }

    .otp-code {
      font-size: 34px;
      font-weight: 800;
      letter-spacing: 8px;
      color: #2563eb;
    }

    .valid-text {
      font-size: 14px;
      color: #ef4444;
      margin-bottom: 25px;
      font-weight: 600;
    }

    .note {
      background-color: #f9fafb;
      border-radius: 12px;
      padding: 15px;
      font-size: 13px;
      color: #6b7280;
      line-height: 1.6;
    }

    .footer {
      padding: 22px 25px;
      text-align: center;
      background-color: #f9fafb;
      font-size: 13px;
      color: #8a94a6;
    }

    .footer strong {
      color: #111827;
    }

    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 20px 10px;
      }

      .content {
        padding: 28px 20px;
      }

      .otp-code {
        font-size: 28px;
        letter-spacing: 6px;
      }

      .header h1 {
        font-size: 23px;
      }
    }
  </style>
</head>

<body>
  <div class="email-wrapper">
    <div class="email-container">

      <div class="header">
        <h1>Verification Code</h1>
        <p>Secure your account with OTP verification</p>
      </div>

      <div class="content">
        <h2>Your OTP Code</h2>

        <p>
          Use the verification code below to complete your login or account verification.
          Please do not share this code with anyone.
        </p>

        <div class="otp-box">
          <div class="otp-code">${otp}</div>
        </div>

        <div class="valid-text">
          This OTP is valid for 10 minutes.
        </div>

        <div class="note">
          If you did not request this OTP, please ignore this email.
          Your account remains safe.
        </div>
      </div>

      <div class="footer">
        <strong>INotebook.com</strong><br />
        This is an automated email. Please do not reply.
      </div>

    </div>
  </div>
</body>
</html>`,
    });

    const newEntry = new OTPModel({
      otp_code: otp,
      email: email,
    });

    await newEntry.save();

  
    return res
      .status(200)
      .json({ message: "OTP sent successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendOTPToEmail;
