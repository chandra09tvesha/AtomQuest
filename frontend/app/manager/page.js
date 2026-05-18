"use client";

import { useState, useEffect } from "react";

export default function Manager() {
  const API = "https://atomquest-backend.onrender.com";

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const res = await fetch(`${API}/goals`);
      const data = await res.json();
      setGoals(data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching goals:", err);
      setLoading(false);
    }
  };

  const approveGoal = async (id) => {
    try {
      await fetch(`${API}/goals/approve/${id}`, {
        method: "PUT",
      });

      fetchGoals();
    } catch (err) {
      console.log("Approve error:", err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div style={{ padding: 20 }}>

      <h1>Manager Dashboard</h1>

      {loading ? (
        <p>Loading goals...</p>
      ) : goals.length === 0 ? (
        <p>No goals found</p>
      ) : (
        goals.map((g) => (
          <div key={g._id} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
            <h3>{g.title}</h3>
            <p>Employee: {g.employeeId}</p>
            <p>Status: {g.approved ? "Approved" : "Pending"}</p>

            {!g.approved && (
              <button onClick={() => approveGoal(g._id)}>
                Approve
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
