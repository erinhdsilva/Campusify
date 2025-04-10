"use client";
import { useEffect, useState } from "react";

export default function LostFoundPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "lost",
    reportedBy: "",
  });

  // Fetch items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/lost-found");
    const data = await res.json();
    setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/lost-found", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ title: "", description: "", status: "lost", reportedBy: "" });
      fetchItems(); // Refresh items
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lost & Found</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Item Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        /><br />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        /><br />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select><br />
        <input
          type="text"
          placeholder="Your Name"
          value={form.reportedBy}
          onChange={(e) => setForm({ ...form, reportedBy: e.target.value })}
          required
        /><br />
        <button type="submit">Report Item</button>
      </form>

      <h2>Recent Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>[{item.status.toUpperCase()}]</strong> {item.title} -{" "}
            {item.description} (Reported by: {item.reportedBy})
          </li>
        ))}
      </ul>
    </div>
  );
}
