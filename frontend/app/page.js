"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const API = "https://your-backend-url.onrender.com";

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [weightage, setWeightage] = useState("");
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    const res = await fetch(`${API}/goals/emp1`);
    const data = await res.json();
    setGoals(data);
  };

  const totalWeightage = () =>
    goals.reduce((sum, g) => sum + Number(g.weightage), 0);

  const createGoal = async () => {
    if (goals.length >= 8) {
      alert("Max 8 goals allowed");
      return;
    }

    if (Number(weightage) < 10) {
      alert("Minimum weightage is 10%");
      return;
    }

    if (totalWeightage() + Number(weightage) > 100) {
      alert("Total weightage cannot exceed 100%");
      return;
    }

    await fetch(`${API}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employeeId: "emp1",
        title,
        target,
        weightage
      })
    });

    setTitle("");
    setTarget("");
    setWeightage("");
    fetchGoals();
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Employee Dashboard</h1>

      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Target" value={target} onChange={(e) => setTarget(e.target.value)} />
      <input placeholder="Weightage" value={weightage} onChange={(e) => setWeightage(e.target.value)} />

      <button onClick={createGoal}>Create Goal</button>

      <h3>Total Weightage: {totalWeightage()}%</h3>

      {goals.map((g) => (
        <div key={g._id} style={{ border: "1px solid black", margin: 10, padding: 10 }}>
          <h3>{g.title}</h3>
          <p>Target: {g.target}</p>
          <p>Weightage: {g.weightage}%</p>
          <p>Status: {g.status}</p>
        </div>
      ))}
    </div>
  );
}
