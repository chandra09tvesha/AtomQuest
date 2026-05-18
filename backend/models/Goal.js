const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },

  title: { type: String, required: true },

  target: { type: Number, required: true },

  weightage: {
    type: Number,
    min: 10,
    max: 100,
    required: true
  },

  achievement: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ["Not Started", "On Track", "Completed"],
    default: "Not Started"
  },

  approved: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Goal", goalSchema);
