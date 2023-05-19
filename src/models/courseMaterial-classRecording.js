const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseMaterialClassRecordingSchema = new Schema(
  {
    lesson: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    subject: {
      name: String,
      standard: String,
      teacher: String,
    },
    courseMaterialClassRecording: {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "courseMaterialRecording",
  courseMaterialClassRecordingSchema
);
