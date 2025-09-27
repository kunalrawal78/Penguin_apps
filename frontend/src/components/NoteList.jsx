import React, { useState } from "react";
import NoteCard from "./NoteCard";

export default function NoteList({ notes, onDelete }) {
  const [selectedNotes, setSelectedNotes] = useState([]);

  const toggleSelect = (id) => {
    setSelectedNotes((prev) =>
      prev.includes(id) ? prev.filter((nid) => nid !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    selectedNotes.forEach((id) => onDelete(id));
    setSelectedNotes([]);
  };

  if (!notes) return <p>No notes found</p>;

  return (
    <div className="w-full px-8 lg:ml-10">
      {selectedNotes.length > 0 && (
        <button
          onClick={handleBulkDelete}
          className="mb-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete {selectedNotes.length} Selected
        </button>
      )}

   
      <div className="flex flex-wrap gap-6 justify-start">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            selectedNotes={selectedNotes}
            toggleSelect={toggleSelect}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
