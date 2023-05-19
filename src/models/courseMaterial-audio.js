const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseMaterialSchemaAudio = new Schema(
  {
    lesson: {
      type: String,
    },
    subject: {
      type: Object,
      data: {
        subjectName: String,
        standard: String,
        teacher: String,
      },
    },
    courseMaterialAudio: {
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "courseMaterialAudio",
  courseMaterialSchemaAudio
);
