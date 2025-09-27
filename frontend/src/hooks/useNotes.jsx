import { useState, useEffect } from "react";
import axios from "axios";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const loadNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const addNote = (note) => {
    setNotes((prev) => [note, ...prev]);
  };

  const updateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
  };

  const removeNote = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Error deleting note", err);
    }
  };

  return { notes, loading, addNote, updateNote, removeNote };
};
