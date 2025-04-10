"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Don't redirect while loading
    if (!session) {
      router.push("/login"); // Not logged in
    } else if (session.user.role !== "admin") {
      router.push("/unauthorized"); // Optional: create this page
    }
  }, [session, status, router]);

  if (status === "loading" || !session || session.user.role !== "admin") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, Admin</h1>
      <ul>
        <li><a href="/admin/events">Manage Events</a></li>
        <li><a href="/admin/lost-found">Lost & Found</a></li>
        <li><a href="/admin/mess-menu">Mess Menu</a></li>
        <li><a href="/admin/notes">Upload Notes</a></li>
        <li><a href="/admin/class-schedule">Class Schedule</a></li>
        <li><a href="/admin/results">Upload Results</a></li>
      </ul>
    </div>
  );
}
