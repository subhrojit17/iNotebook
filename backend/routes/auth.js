const express = require("express");
const User = require('../models/User')
const router = express.Router();


// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post("/", (req, res) => {
  try {
    console.log(req.body);
    const user = new User (req.body)
    user.save()
    res.send(req.body);
  } catch (error) {
    res.send({
      error: `Ssup y'all? The ${error} shit is not buzzing, no cap.`,
    });
  }
});

module.exports = router;
