"use client";

import { useState, useEffect } from "react";

export default function Admin() {
  const API = "https://atomquest-backend.onrender.com";

  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    const res = await fetch(`${API}/goals`);
    const data = await res.json();
    setGoals(data);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const total = goals.length;
  const approved = goals.filter(g => g.approved).length;
  const pending = total - approved;

  return (
    <div style={{ padding: 20 }}>

      {/* NAVIGATION */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <a href="/">Employee</a>
        <a href="/manager">Manager</a>
        <a href="/admin">Admin</a>
      </div>

      <h1>Admin Dashboard</h1>

      <p>Total Goals: {total}</p>
      <p>Approved: {approved}</p>
      <p>Pending: {pending}</p>

      {goals.map(g => (
        <div key={g._id}>
          <h4>{g.title}</h4>
          <p>{g.employeeId}</p>
          <p>{g.approved ? "Approved" : "Pending"}</p>
        </div>
      ))}
    </div>
  );
}
