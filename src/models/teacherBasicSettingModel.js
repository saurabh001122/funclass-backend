const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherBasicSettingSchema = new Schema(
  {
    gender: {
      type: String,
    },

    number: {
      type: String,
    },
    subject: {
      type: String,
    },
    classes: {
      type: String,
    },
    about: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "teacherBascSetting",
  teacherBasicSettingSchema
);
