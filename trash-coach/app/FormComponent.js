"use client";

import { useState } from "react";
import React from 'react';
import Popup from 'reactjs-popup';
import { useRouter } from "next/navigation";



export default function FormComponent({message}) {

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
        } catch (err) {
        console.error(err);
        setError("Failed to add note. Please try again." + err);
        } finally {
        setLoading(false);
        }
    };

    const router = useRouter();

    const handleReload = () => {
        router.refresh(); // Equivalent to reloading the current route.
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
            <option value="1">Ca me fait chier</option>
            <option value="0">Ca me fait plez</option>
            </select>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Popup trigger={      <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
        </button>} position="right center" modal nested>
                {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <div className="header"> {message} </div>
                    <div className="actions">
                    <button className="button" onClick={() => {
                        handleReload();
                        close();
                    }}>Fermer</button>
                    </div>
                </div>
                )}
            </Popup>
            </div>
        </form>
    );
}
