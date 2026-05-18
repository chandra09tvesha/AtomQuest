"use client";

import { useEffect, useState } from "react";

export default function Manager() {
  const API = "https://your-backend-url.onrender.com";
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    const res = await fetch(`${API}/goals/emp1`);
    setGoals(await res.json());
  };

  const approve = async (id) => {
    await fetch(`${API}/goals/approve/${id}`, { method: "PUT" });
    fetchGoals();
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API}/goals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    fetchGoals();
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Manager Dashboard</h1>

      {goals.map((g) => (
        <div key={g._id} style={{ margin: 10, padding: 10, border: "1px solid gray" }}>
          <h3>{g.title}</h3>

          <button onClick={() => approve(g._id)}>Approve</button>

          <select onChange={(e) => updateStatus(g._id, e.target.value)}>
            <option>Not Started</option>
            <option>On Track</option>
            <option>Completed</option>
          </select>
        </div>
      ))}
    </div>
  );
}
