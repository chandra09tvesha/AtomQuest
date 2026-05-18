"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [goals, setGoals] = useState([]);

  const API = "http://localhost:5000";

  const fetchGoals = async () => {
    const res = await fetch(`${API}/goals/emp1`);
    const data = await res.json();
    setGoals(data);
  };

  const createGoal = async () => {
    await fetch(`${API}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employeeId: "emp1",
        title,
        target,
        weightage: 20
      })
    });

    setTitle("");
    setTarget("");
    fetchGoals();
  };

  const updateProgress = async (id, value) => {
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
      <h1>AtomQuest Employee Dashboard</h1>

      <input
        placeholder="Goal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Target"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />

      <button onClick={createGoal}>Create Goal</button>

      <hr />

      {goals.map((g) => (
        <div key={g._id} style={{ border: "1px solid black", margin: 10, padding: 10 }}>
          <h3>{g.title}</h3>
          <p>Target: {g.target}</p>
          <p>Status: {g.status}</p>

          <input
            placeholder="Update progress"
            onChange={(e) => updateProgress(g._id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
