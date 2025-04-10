"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminNotesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [subject, setSubject] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/login");
    } else {
      fetchNotes();
    }
  }, [session, status]);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("subject", subject);
    formData.append("uploadedBy", uploadedBy);

    const res = await fetch("/api/notes", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setSubject("");
      setUploadedBy("");
      setFile(null);
      fetchNotes();
    }
  };

  if (status === "loading" || !session || session.user.role !== "admin") {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Upload Notes</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Uploaded By"
          value={uploadedBy}
          onChange={(e) => setUploadedBy(e.target.value)}
          required
        /><br />
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        /><br />
        <button type="submit">Upload</button>
      </form>

      <h2>Uploaded Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <strong>{note.subject}</strong> - Uploaded by {note.uploadedBy} (
            <a href={note.fileUrl} target="_blank" rel="noreferrer">View</a>)
          </li>
        ))}
      </ul>
    </div>
  );
}
