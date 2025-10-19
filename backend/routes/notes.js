const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1 : Get All the Notes of the Logged in User using : GET "api/notes/fetchAllNotes". Login Required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

// ROUTE 2 : Add a new Note for the Logged in User using : POST "api/notes/addNote". Login Required
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { title, description, tag } = req.body;
    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const newNote = await note.save();
      res.status(201).json(newNote);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
