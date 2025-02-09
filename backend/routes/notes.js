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

//Route2 : Create note - User should be logged in
router.post(
  "/addnote",
  fetchuser,
  [
    body("name", "Enter valid name for your note.").isLength({ min: 3 }),
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
        name: req.body.name,
        description: req.body.description,
        tag: req.body.tag,
      });

      res.status(200).json(note);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error.");
    }
  }
);

export default router;
