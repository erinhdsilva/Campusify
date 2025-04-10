"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminEventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", date: "" });

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/login");
    } else {
      fetchEvents();
    }
  }, [session, status]);

  const fetchEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        createdBy: session.user.email,
      }),
    });
    if (res.ok) {
      setForm({ title: "", description: "", date: "" });
      fetchEvents();
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/events?id=${id}`, { method: "DELETE" });
    fetchEvents();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Event Dashboard</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <button type="submit">Add Event</button>
      </form>

      <ul>
        {events.map((event) => (
          <li key={event._id} style={{ marginBottom: "10px" }}>
            <strong>{event.title}</strong> ({new Date(event.date).toLocaleDateString()})<br />
            {event.description}<br />
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
