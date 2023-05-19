const mongoose = require("mongoose");
const { Schema } = mongoose;

const assignmentSchema = new Schema({
  title: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  fileUrl: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
