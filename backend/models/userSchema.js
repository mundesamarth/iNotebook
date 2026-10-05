const mongoose = require("mongoose");


const new_user_schema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phonenumber: {
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    }
},{
    timestamps:true,
})


const userModel = mongoose.model("inb_user_details",new_user_schema);


module.exports = userModel;

