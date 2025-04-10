"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminClassSchedulePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [schedules, setSchedules] = useState([]);
  const [year, setYear] = useState("1");
  const [branch, setBranch] = useState("CS");
  const [form, setForm] = useState({
    day: "",
    time: "",
    subject: "",
    faculty: "",
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/login");
    } else {
      fetchSchedule();
    }
  }, [status, session, year, branch]);

  const fetchSchedule = async () => {
    const res = await fetch(`/api/class-schedule?year=${year}&branch=${branch}`);
    const data = await res.json();
    setSchedules(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/class-schedule", {
      method: "POST",
      body: JSON.stringify({ ...form, year, branch }),
    });
    if (res.ok) {
      setForm({ day: "", time: "", subject: "", faculty: "" });
      fetchSchedule();
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/class-schedule?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setSchedules((prev) => prev.filter((item) => item._id !== id));
    }
  };

  if (status === "loading" || !session || session.user.role !== "admin") {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin - Class Schedule</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>Year: </label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <label style={{ marginLeft: "1rem" }}>Branch: </label>
        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option value="CS">CS</option>
          <option value="IT">IT</option>
          <option value="CSB">CSB</option>
          <option value="CSAI">CSAI</option>
        </select>
      </div>

      <form onSubmit={handleAdd} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Day"
          value={form.day}
          onChange={(e) => setForm({ ...form, day: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Faculty"
          value={form.faculty}
          onChange={(e) => setForm({ ...form, faculty: e.target.value })}
          required
        />
        <button type="submit">Add</button>
      </form>

      <h2>Current Schedule</h2>
      {schedules.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul>
          {schedules.map((item) => (
            <li key={item._id}>
              <strong>{item.day}</strong> | {item.time} - {item.subject} ({item.faculty})
              <button
                onClick={() => handleDelete(item._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
