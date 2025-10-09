const connectToMongo = require("./db");
const express = require("express");
const dotenv = require("dotenv");

connectToMongo();
const app = express();
const port = process.env.PORT || 8000;

app.get("/", async (req, res) => {
  res.send("Hello Hore");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port} `);
});
