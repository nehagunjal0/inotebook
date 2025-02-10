import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import Notes from "../models/Notes.js";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router();

//Route1 : Fetch all notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
});

//Route2 : Add note - User should be logged in
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter valid name for your note.").isLength({ min: 3 }),
    body("description", "Enter description in more details").isLength({
      min: 20,
    }),
    body("tag", "Should be max of 5 letters").isLength({ max: 5 }),
  ],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(400).json({
          error: "Kindly login to add notes.",
        });
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const note = await Notes.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.id,
      });

      res.status(200).json(note);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error.");
    }
  }
);

//Route 3: Updating note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create a new note obj:
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

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not found");
    }
    console.log(note);

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
});

//Route 4: Deleting note

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find by id if the notes exists
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Note not found");
    }

    //allow deletion only if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(400).send("Not Allowed for this user");
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal server error");
  }
});

export default router;
