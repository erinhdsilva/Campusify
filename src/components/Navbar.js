"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === "admin";
  const isStudent = session?.user?.role === "student";

  return (
    <nav
      style={{
        background: "#1e40af",
        padding: "1rem",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "white" }}>Home</Link>

        {isAdmin && (
          <>
            <Link href="/admin/events" style={{ color: "white" }}>Admin Events</Link>
            <Link href="/admin/notes" style={{ color: "white" }}>Admin Notes</Link>
            <Link href="/admin/class-schedule" style={{ color: "white" }}>Admin Schedule</Link>
            <Link href="/admin/mess-menu" style={{ color: "white" }}>Admin Mess Menu</Link>
            <Link href="/admin/lost-found" style={{ color: "white" }}>Admin Lost & Found</Link>
          </>
        )}

        {isStudent && (
          <>
            <Link href="/events" style={{ color: "white" }}>Events</Link>
            <Link href="/notes" style={{ color: "white" }}>Notes</Link>
            <Link href="/class-schedule" style={{ color: "white" }}>Schedule</Link>
            <Link href="/mess-menu" style={{ color: "white" }}>Mess Menu</Link>
            <Link href="/lost-found" style={{ color: "white" }}>Lost & Found</Link>
          </>
        )}
      </div>

      {status === "authenticated" && (
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            backgroundColor: "#ef4444",
            border: "none",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🚪 Logout
        </button>
      )}
    </nav>
  );
}
