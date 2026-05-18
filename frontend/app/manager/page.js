"use client";

import { useEffect, useState } from "react";

export default function Manager() {
  const [goals, setGoals] = useState([]);

  const API = "http://localhost:5000";

  const fetchGoals = async () => {
    const res = await fetch(`${API}/goals/emp1`);
    const data = await res.json();
    setGoals(data);
  };

  const approve = async (id) => {
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
      <h1>Manager Dashboard</h1>

      {goals.map((g) => (
        <div key={g._id} style={{ margin: 10, padding: 10, border: "1px solid gray" }}>
          <h3>{g.title}</h3>
          <p>Target: {g.target}</p>

          <button onClick={() => approve(g._id)}>Approve</button>
        </div>
      ))}
    </div>
  );
}
