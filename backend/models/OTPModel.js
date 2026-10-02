const {mongoose} = require("mongoose");

const otpSchema = new mongoose.Schema({
    otp_code:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    attempts:{
        type:Number,
        default: 0
    }
},{timestamps:true})


const OTPModel = mongoose.model("inb_otp_details",otpSchema);

module.exports = OTPModel;