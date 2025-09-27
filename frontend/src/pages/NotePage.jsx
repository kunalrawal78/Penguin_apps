import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import Pagination from "../components/Pagination";

const NotePage = () => {
  const { id } = useParams(); 
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (id) {
          const res = await axios.get(`http://localhost:4000/api/notes/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setNotes([res.data]);
          setFilteredNotes([res.data]);
        } else {
          const res = await axios.get("http://localhost:4000/api/notes", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const sortedNotes = res.data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );

          setNotes(sortedNotes);
          setFilteredNotes(sortedNotes);
        }
      } catch (err) {
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [id]);

  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredNotes(notes);
    } else {
      const lowerSearch = searchText.toLowerCase();
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(lowerSearch) ||
            note.content.toLowerCase().includes(lowerSearch)
        )
      );
    }
    setCurrentPage(1);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm sm:text-base">Loading notes...</p>
    </div>
  );

  const indexOfLast = currentPage * notesPerPage;
  const indexOfFirst = indexOfLast - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirst, indexOfLast);

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-6">
      {/* Header Section */}
      {!id && (
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
            All Notes
          </h1>
          
          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {/* Create Note Link */}
          <Link
            to="/create"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition text-sm sm:text-base font-medium"
          >
            + Create New Note
          </Link>
        </div>
      )}

      {/* Single Note View Header */}
      {id && (
        <div className="mb-4 sm:mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-4 text-sm sm:text-base"
          >
            ← Back to All Notes
          </Link>
        </div>
      )}

      {/* Notes Content */}
      {currentNotes.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p className="text-gray-500 text-sm sm:text-base mb-4">
            No notes found.
          </p>
          {!id && (
            <Link
              to="/create"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition text-sm sm:text-base"
            >
              Create Your First Note
            </Link>
          )}
        </div>
      ) : (
        <>
          <NoteList notes={currentNotes} onDelete={() => {}} />
          
          {/* Pagination */}
          {filteredNotes.length > notesPerPage && (
            <div className="mt-6 sm:mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredNotes.length / notesPerPage)}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotePage;