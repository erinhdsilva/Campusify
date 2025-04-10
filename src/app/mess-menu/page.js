"use client";
import { useEffect, useState } from "react";

export default function MessMenuPage() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const res = await fetch("/api/mess-menu");
      const data = await res.json();
      setMenus(data);
    };
    fetchMenus();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mess Menu</h1>
      {menus.length === 0 ? (
        <p>No menu available.</p>
      ) : (
        <ul>
          {menus.map((menu) => (
            <li key={menu._id} style={{ marginBottom: "1.5rem" }}>
              <h3>{menu.day}</h3>
              <p><strong>Breakfast:</strong> {menu.breakfast}</p>
              <p><strong>Lunch:</strong> {menu.lunch}</p>
              <p><strong>Dinner:</strong> {menu.dinner}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
