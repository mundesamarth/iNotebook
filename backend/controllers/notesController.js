const userModel = require("../models/userSchema");
const notesModel = require("../models/notesSchema");
const { validationResult } = require("express-validator");

// create new node controller
const create_new_notes_controller = async (req, res) => {
  try {
    let errors = validationResult(req);

    if (errors.array().length > 0) {
      return res.status(400).json({
        message: "Something went wrong dawg while validating notes",
        success: false,
      });
    }

    const exist_user = await userModel.findOne({ _id: req.token._id });

    if (!exist_user) {
      return res.status(400).json({
        message: "Invalid Authentication",
        success: false,
      });
    }

    const newNotes = new notesModel({
      user_id: req.token._id,
      title: req.body.title,
      description: req.body.description,
    });

    await newNotes.save();

    return res.status(200).json({
      message: "Notes Created gang chill",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error while adding notes",
      success: false,
    });
  }
};

// fetching user notes controller:
const fetch_user_notes_controller = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
      return res.status(400).json({
        message: "Something went wrong while validating fetch notes gang",
        success: false,
      });
    }

    const exist_user = await userModel.findOne({ _id: req.token._id });

    if (!exist_user) {
      return res.status(400).json({
        message: "Invalid Authentication",
        success: false,
      });
    }

    const notes = await notesModel
      .find({ user_id: req.token._id })
      .sort({ _id: 1 });

    return res.status(200).json({
      message: "Here are your notes gang....",
      notes,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error while fetching notes",
      success: false,
    });
  }
};

// updating user notes
const update_user_notes_controller = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
      return res.status(400).json({
        message: "Something went wrong while validating fetch notes gang",
        success: false,
      });
    }

    const exist_user = await userModel.findOne({ _id: req.token._id });

    if (!exist_user) {
      return res.status(400).json({
        message: "Invalid Authentication",
        success: false,
      });
    }

    const exist_note = await notesModel.findOne({
      _id: req.body._id,
      user_id: req.token._id,
    });

    if (!exist_note) {
      return res
        .status(400)
        .json({ message: "No Notes Found", success: false });
    }

    exist_note.title = req.body.title;
    exist_note.description = req.body.description;

    await exist_note.save()
    return res.status(200).json({
      message: "Notes have been updated gang",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error while updating notes",
      success: false,
    });
  }
};


// delete user notes controller

const delete_user_notes_controller = async(req,res) =>{
  try {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
      return res.status(400).json({
        message: "Something went wrong while validating deleting notes gang",
        success: false,
      });
    }

    const exist_user = await userModel.findOne({ _id: req.token._id });

    if (!exist_user) {
      return res.status(400).json({
        message: "Invalid Authentication",
        success: false,
      });
    }

    const exist_note = await notesModel.findOne({
      _id: req.body._id,
      user_id: req.token._id,
    });

    if (!exist_note) {
      return res
        .status(400)
        .json({ message: "No Notes Found", success: false });
    }

    await notesModel.deleteOne({_id: req.body._id})
    return res.status(200).json({
      message: "Notes have been deleted gang",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error while deleting notes",
      success: false,
    });
  }
}
module.exports = {
  create_new_notes_controller,
  fetch_user_notes_controller,
  update_user_notes_controller,
  delete_user_notes_controller,
};
