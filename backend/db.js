const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URL;
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully");
  } catch (error) {
    console.error("Failed to connect to Mongo: ", error);
  }
};

module.exports = connectToMongo;
