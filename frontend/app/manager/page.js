"use client";

import { useState, useEffect } from "react";

export default function Manager() {
  const API = "https://atomquest-backend.onrender.com";

  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    const res = await fetch(`${API}/goals`);
    const data = await res.json();
    setGoals(data);
  };

  const approveGoal = async (id) => {
    await fetch(`${API}/goals/approve/${id}`, {
      method: "PUT"
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

      <h1>Manager Dashboard</h1>

      {goals.map(g => (
        <div key={g._id}>
          <h4>{g.title}</h4>
          <p>{g.employeeId}</p>
          <p>{g.approved ? "Approved" : "Pending"}</p>

          {!g.approved && (
            <button onClick={() => approveGoal(g._id)}>Approve</button>
          )}
        </div>
      ))}
    </div>
  );
}
