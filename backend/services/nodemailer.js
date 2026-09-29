const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user:process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});


module.exports=transporter;