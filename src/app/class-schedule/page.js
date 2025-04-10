"use client";
import { useEffect, useState } from "react";

export default function ClassSchedulePage() {
  const [year, setYear] = useState("1");
  const [branch, setBranch] = useState("CS");
  const [schedule, setSchedule] = useState([]);

  const fetchSchedule = async () => {
    const res = await fetch(`/api/class-schedule?year=${year}&branch=${branch}`);
    const data = await res.json();
    setSchedule(data);
  };

  useEffect(() => {
    fetchSchedule();
  }, [year, branch]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Class Schedule</h1>

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

      {schedule.length === 0 ? (
        <p>No schedule available.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Faculty</th>
          
            </tr>
          </thead>
          <tbody>
            {schedule.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.day}</td>
                <td>{entry.time}</td>
                <td>{entry.subject}</td>
                <td>{entry.faculty}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
