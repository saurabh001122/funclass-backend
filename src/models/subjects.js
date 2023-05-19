const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectsSchema = new Schema(
  {
    subjectName: String,
    subjectTeachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
      },
    ],
    standard: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("subject", subjectsSchema);
