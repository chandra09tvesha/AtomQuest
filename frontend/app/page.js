"use client";

import { useState, useEffect } from "react";

export default function Employee() {
  const API = "https://atomquest-backend.onrender.com";
  const employeeId = "emp1";

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    const res = await fetch(`${API}/goals/${employeeId}`);
    const data = await res.json();
    setGoals(data);
  };

  const createGoal = async () => {
    await fetch(`${API}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId, title, target, weightage: 20 })
    });

    setTitle("");
    setTarget("");
    fetchGoals();
  };

  const updateGoal = async (id, value) => {
    await fetch(`${API}/goals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ achievement: value })
    });

    fetchGoals();
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div style={{ padding: 20 }}>

      {/* NAVIGATION */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <a href="/">Employee</a>
        <a href="/manager">Manager</a>
        <a href="/admin">Admin</a>
      </div>

      <h1>Employee Dashboard</h1>

      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Target" value={target} onChange={e => setTarget(e.target.value)} />

      <button onClick={createGoal}>Create Goal</button>

      <h3>Your Goals</h3>

      {goals.map(g => (
        <div key={g._id}>
          <h4>{g.title}</h4>
          <input placeholder="Progress" onChange={e => updateGoal(g._id, e.target.value)} />
        </div>
      ))}
    </div>
  );
}
