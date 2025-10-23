require("dotenv").config();
const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", async (req, res) => {
  res.send("Hello Hore!");
});

app.listen(port, () => {
  console.log(`iNotebook api listening at http://localhost:${port} `);
});
