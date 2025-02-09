import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.js";

const JWT_SECRET = "SeCuRiNgAutHeNtIcAtIoN";
const router = express.Router();

//Route 1=> create user API: /api/auth/createuser
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //res.send("authentication started");
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "A User with same email already exists." });
      }

      //securing password:
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Creating a new user:
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //creating a token:
      const data = {
        user: {
          id: user.id,
        },
      };

      const jwtData = jwt.sign(data, JWT_SECRET);
      console.log(jwtData);

      res.status(201).send("User registered successfully!");
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error.");
    }
  }
);

//Route 2 => Login user API: /api/auth/login
router.post(
  "/login",
  [
    body("email", "Enter a valid emailid").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "Enter valid credentials" });
      }

      const passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCompare) {
        return res.status(400).json({ error: "Enter valid credentials" });
      }

      //creating a token:
      //payload - data to be sent
      const data = {
        user: {
          id: user.id,
        },
      };

      const jwtData = jwt.sign(data, JWT_SECRET);
      console.log(jwtData);

      res.status(201).send("Login successful!");
    } catch (error) {
      console.log(error.message);

      res.status(500).send("Internal server error");
    }
  }
);

//Route3 => Fetch user
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

export default router;
