// import mongoose from "mongoose";
const mongoose = require("mongoose");
// import dotenv from "dotenv";
const dotenv = require("dotenv");

dotenv.config();
const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongodb");
  } catch (err) {
    console.log("error in momgodb connection");
  }
};

module.exports = mongoConnection;
