"use client";

import { useState } from "react";

export default function FormComponent() {
  const [note, setNote] = useState("");
  const [effect, setEffect] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note, effect }),
      });

      if (!res.ok) throw new Error("Failed to add note");

      setNote("");
      setEffect("");
      alert("Note added successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to add note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="note">Note:</label>
        <input
          type="text"
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
          className="new-note-input"
        />
      </div>
      <div>
        <label htmlFor="effect">Effect:</label>
        <select
          id="effect"
          value={effect}
          onChange={(e) => setEffect(e.target.value)}
          required
        >
          <option value="" disabled>
            -- effet --
          </option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
