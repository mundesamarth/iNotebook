const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const {
  create_new_notes_controller,
  fetch_user_notes_controller,
  update_user_notes_controller,
  delete_user_notes_controller,
} = require("../controllers/notesController");

// adding the notes
router.post(
  "/create-new-notes",
  verifyToken,
  [
    body("title")
      .isString()
      .withMessage("invalid title")
      .notEmpty()
      .withMessage("invalid title")
      .isLength({ min: 10, max: 150 })
      .withMessage(
        "title must be greater than 10 characters or less than 150 characters",
      ),
    body("description")
      .isString()
      .withMessage("invalid description")
      .notEmpty()
      .withMessage("invalid description")
      .isLength({ min: 10 })
      .withMessage("description must be greater than 10 charaters "),
  ],
  create_new_notes_controller,
);

// Fetching the notes
router.get("/fetch-user-notes", verifyToken, fetch_user_notes_controller);

// Updating Notes
router.put(
  "/update-user-notes",
  verifyToken,
  [
    body("_id").isMongoId().withMessage("invalid object id"),
    body("title")
      .isString()
      .withMessage("invalid title")
      .notEmpty()
      .withMessage("invalid title")
      .isLength({ min: 10, max: 150 })
      .withMessage(
        "title must be greater than 10 characters or less than 150 characters",
      ),
    body("description")
      .isString()
      .withMessage("invalid description")
      .notEmpty()
      .withMessage("invalid description")
      .isLength({ min: 10 })
      .withMessage("description must be greater than 10 charaters "),
  ],
  update_user_notes_controller,
);

// Deleting the notes
router.delete("/delete-user-notes",verifyToken, [ body("_id").isMongoId().withMessage("invalid object id")],delete_user_notes_controller)
module.exports = router;
