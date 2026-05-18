const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");


// CREATE GOAL
router.post("/", async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET GOALS BY EMPLOYEE
router.get("/:employeeId", async (req, res) => {
  try {
    const goals = await Goal.find({
      employeeId: req.params.employeeId
    });

    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE GOAL (progress / status)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// APPROVE GOAL (Manager)
router.put("/approve/:id", async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET ALL GOALS (Admin use)
router.get("/", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
