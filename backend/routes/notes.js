const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {

    res.json([]);
  } catch (error) {
    res.send({
      error: `Ssup y'all? The ${error} shit is not buzzing, no cap.`,
    });
  }
});

module.exports = router;
