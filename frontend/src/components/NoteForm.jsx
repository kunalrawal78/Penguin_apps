import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function NoteForm({ onAddNote, onUpdateNote }) {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem("token");
      setLoading(true);
      axios
        .get(`http://localhost:4000/api/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching note:", err);
          setError("Failed to load note. Please try again.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      let res;

      if (id) {
        // UPDATE note
        res = await axios.put(
          `http://localhost:4000/api/notes/${id}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (onUpdateNote) onUpdateNote(res.data);
      } else {
        // CREATE note
        res = await axios.post(
          "http://localhost:4000/api/notes",
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (onAddNote) onAddNote(res.data);
      }

      setLoading(false);
      navigate("/"); 
    } catch (err) {
      console.error("Error saving note:", err);
      setError("Failed to save note. Please try again.");
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4 text-sm sm:text-base">Loading...</p>;

  return (
    <div className="w-full max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">
        {id ? "Edit Note ✏️" : "Create a New Note 📝"}
      </h2>

      {error && <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-5">
        {/* Title */}
        <input
          type="text"
          placeholder="Enter a title..."
          className="border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your content here..."
          className="border border-gray-300 rounded-lg p-2 sm:p-3 h-32 sm:h-40 resize-none text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          type="submit"
          className={`w-full py-2 sm:py-3 rounded-lg font-semibold text-white shadow-md transition transform text-sm sm:text-base ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-[1.02]"
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : id ? "Update Note" : "Create Note"}
        </button>
      </form>
    </div>
  );
}