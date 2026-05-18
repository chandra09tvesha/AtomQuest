const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");

// CREATE GOAL
router.post("/", async (req, res) => {
  const goals = await Goal.find({ employeeId: req.body.employeeId });

  if (goals.length >= 8)
    return res.status(400).json({ error: "Max 8 goals allowed" });

  const total = goals.reduce((a, b) => a + b.weightage, 0);

  if (req.body.weightage < 10)
    return res.status(400).json({ error: "Min 10% weightage" });

  if (total + req.body.weightage > 100)
    return res.status(400).json({ error: "Total must be 100%" });

  const goal = new Goal(req.body);
  await goal.save();

  res.json(goal);
});

// GET GOALS
router.get("/:employeeId", async (req, res) => {
  const goals = await Goal.find({ employeeId: req.params.employeeId });
  res.json(goals);
});

// UPDATE ACHIEVEMENT
router.put("/:id", async (req, res) => {
  const updated = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// APPROVE
router.put("/approve/:id", async (req, res) => {
  const goal = await Goal.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  res.json(goal);
});

module.exports = router;
