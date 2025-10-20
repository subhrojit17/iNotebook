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
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const { title, description, tag } = req.body;

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

// ROUTE 3 : Edit an existing Note of a Logged in User using : PUT "api/notes/editNote". Login Required
router.put("/editNote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  //Create a newNote Object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // Find the note to be updated and update it.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ error: "Note Not Found." });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Not Allowed" });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

// ROUTE 4 : Delete an existing Note of a Logged in User using : DELETE "api/notes/deleteNote". Login Required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  // Find the note to be deleted and delete it.
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ error: "Note Not Found." });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Not Allowed" });
    }

    // Allow deletion only if user owns this Note
    note = await Note.findByIdAndDelete(req.params.id);
    return res.json({
      message: "The note has been sucessfully deleted!",
      note: note,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
