const mongoose = require("mongoose");


const notesSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "inb_user_details",
        required: true,
    },
    title:{
        required: true,
        type:String,
    },
    description:{
        required: true,
        type:String,
    }
},{timestamps: true});

const notesModel = mongoose.model("inb_notes_db",notesSchema);

module.exports = notesModel;