<div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
  <a href="/">Employee</a>
  <a href="/manager">Manager</a>
  <a href="/admin">Admin</a>
</div>
"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Admin() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(`${API}/goals`)
      .then(res => res.json())
      .then(setGoals);
  }, []);

  const total = goals.length;
  const approved = goals.filter(g => g.approved).length;

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <p>Total: {total}</p>
      <p>Approved: {approved}</p>
      <p>Pending: {total - approved}</p>

      {goals.map(g => (
        <div key={g._id}>
          <h4>{g.title}</h4>
          <p>{g.employeeId}</p>
        </div>
      ))}
    </div>
  );
}
