const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bycrpt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const dotenv = require("dotenv");

const secretKey = process.env.JWT_SECRET;

// Create a User using: POST "/api/auth/creatUser". Doesn't require Auth
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name!").isLength({ min: 3 }),
    body("email", "Enter a valid email!").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    //Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exits!" });
      }
      const SALT = await bycrpt.genSalt(10);
      secPassword = await bycrpt.hash(req.body.password, SALT);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secretKey);

      // res.json(user);
      res.json({ authToken });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
