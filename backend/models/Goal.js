const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  employeeId: String,
  title: String,
  target: Number,
  weightage: Number,
  achievement: { type: Number, default: 0 },
  status: { type: String, default: "Not Started" },
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model("Goal", goalSchema);
