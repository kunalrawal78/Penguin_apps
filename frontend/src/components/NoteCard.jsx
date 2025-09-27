import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoteCard({ note, selectedNotes, toggleSelect, onDelete }) {
  const navigate = useNavigate();

  const handleView = () => navigate(`/note/${note.id}`);
  const handleEdit = () => navigate(`/note/${note.id}/edit`);

  return (
    <div className="flex flex-col w-full sm:min-w-[320px] sm:max-w-[400px] lg:min-w-[350px] lg:max-w-[500px] flex-grow p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-200">
      <div className="flex items-start mb-3">
        <input
          type="checkbox"
          className="mr-2 sm:mr-3 mt-1 h-4 w-4 sm:h-5 sm:w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
          checked={selectedNotes?.includes(note.id)}
          onChange={() => toggleSelect(note.id)}
        />
        <div className="flex flex-col flex-grow min-w-0">
          <h2 className="font-semibold text-base sm:text-lg text-gray-800 truncate">
            {note?.title || "Untitled Note"}
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-3 break-words">
            {note?.content || "No content yet..."}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-auto justify-end">
        <button
          className="px-3 sm:px-4 py-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition text-xs sm:text-sm font-medium"
          onClick={handleView}
        >
          View
        </button>
        <button
          className="px-3 sm:px-4 py-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition text-xs sm:text-sm font-medium"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="px-3 sm:px-4 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition text-xs sm:text-sm font-medium"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}