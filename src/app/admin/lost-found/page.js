"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLostFoundPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/login");
    } else {
      fetchItems();
    }
  }, [session, status]);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/lost-found");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/lost-found?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        console.error("Failed to delete item");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  if (status === "loading" || !session || session.user.role !== "admin") {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Lost & Found Dashboard</h1>
      {items.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul>
          {items.map((item) => (
           <li key={item._id} style={{ marginBottom: "10px" }}>
  <strong>{item.type ? item.type.toUpperCase() : "UNKNOWN"}:</strong> {item.title} by {item.reportedBy}

              <br />
              <em>{item.description}</em>
              <br />
              <button onClick={() => handleDelete(item._id)} style={{ marginTop: "5px" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
