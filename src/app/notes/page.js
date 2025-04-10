"use client";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Available Notes</h1>
      {notes.length === 0 ? (
        <p>No notes available yet.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note._id} style={{ marginBottom: "1rem" }}>
              <strong>{note.subject}</strong> (Uploaded by: {note.uploadedBy}) <br />
              <a href={note.fileUrl} download target="_blank" rel="noopener noreferrer">
                Download PDF
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
