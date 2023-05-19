// import mongoose from "mongoose";
const mongoose = require("mongoose");
// import validator from "validator";
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },

    role: {
      type: String,
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("user", userSchema);
