const {mongoose} = require("mongoose");

const otpSchema = new mongoose.Schema({
    otp_code:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
},{timestamps:true})


const OTPModel = mongoose.model("inb_otp_details",otpSchema);

module.exports = OTPModel;