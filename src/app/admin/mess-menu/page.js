"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminMessMenuPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({
    day: "",
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/login");
    } else {
      fetchMenus();
    }
  }, [session, status]);

  const fetchMenus = async () => {
    const res = await fetch("/api/mess-menu");
    const data = await res.json();
    setMenus(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/mess-menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ day: "", breakfast: "", lunch: "", dinner: "" });
      fetchMenus();
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/mess-menu?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setMenus((prev) => prev.filter((menu) => menu._id !== id));
    }
  };

  if (status === "loading" || !session || session.user.role !== "admin") {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Mess Menu Dashboard</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Day"
          value={form.day}
          onChange={(e) => setForm({ ...form, day: e.target.value })}
          required
        /><br />
        <textarea
          placeholder="Breakfast"
          value={form.breakfast}
          onChange={(e) => setForm({ ...form, breakfast: e.target.value })}
          required
        /><br />
        <textarea
          placeholder="Lunch"
          value={form.lunch}
          onChange={(e) => setForm({ ...form, lunch: e.target.value })}
          required
        /><br />
        <textarea
          placeholder="Dinner"
          value={form.dinner}
          onChange={(e) => setForm({ ...form, dinner: e.target.value })}
          required
        /><br />
        <button type="submit">Add Menu</button>
      </form>

      <h2>Current Menus</h2>
      <ul>
        {menus.map((menu) => (
          <li key={menu._id} style={{ marginBottom: "1rem" }}>
            <strong>{menu.day}</strong><br />
            🍳 Breakfast: {menu.breakfast}<br />
            🍛 Lunch: {menu.lunch}<br />
            🍽️ Dinner: {menu.dinner}<br />
            <button onClick={() => handleDelete(menu._id)} style={{ marginTop: "5px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
