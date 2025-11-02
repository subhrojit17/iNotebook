const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bycrpt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

const secretKey = process.env.JWT_SECRET;

// ROUTE 1 : Create a User using: POST "/api/auth/creatUser". No login required
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
    let success = false;

    // If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error: errors.array() });
    }
    //Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Sorry, a user with this email already exits!",
          });
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
      success = true;
      const authToken = jwt.sign(data, secretKey);

      // res.json(user);
      res.status(201).json({ success, authToken });
    } catch (err) {
      success = false;
      console.error(err.message);
      return res.status(500).send({ success, error: "Internal Server Error" });
    }
  }
);

// ROUTE 2 : Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email!").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try with the valid credentials." });
      }

      const passwordComp = await bycrpt.compare(password, user.password);
      if (!passwordComp) {
        success = false;

        return res
          .status(400)
          .json({ error: "Please try with the valid credentials." });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, secretKey);
      success = true;

      res.json({ success, authToken });
    } catch (error) {
      success = false;
      console.log(error.message);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 3 : Get logged in User details using: : GET "/api/auth/getUser". Login required
router.get("/getUser", fetchUser, async (req, res) => {
  let success = false
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    success = true
    res.status(200).send({success,user});
  } catch (error) {
    success = false
    console.log(error.message);
    return res.status(500).send({success, error: "Internal Server Error" });
  }
});
module.exports = router;
