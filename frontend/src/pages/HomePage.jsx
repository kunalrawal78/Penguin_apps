import React, { useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import { useNotes } from "../hooks/useNotes";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const formRef = useRef(null);
  const { notes, loading, addNote, updateNote, removeNote } = useNotes();
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [showForm, setShowForm] = useState(false); 

  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10;

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault();
        setShowForm(true);
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
            formRef.current.querySelector("input").focus();
          }
        }, 100);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const indexOfLast = currentPage * notesPerPage;
  const indexOfFirst = indexOfLast - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">My Notes</h1>

      {/* Search and Add Note Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className="w-full sm:flex-1">
          <SearchBar onSearch={handleSearch} />
        </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="w-8 h-8 sm:w-auto sm:px-5 sm:py-2 rounded-full sm:rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition text-lg sm:text-base font-medium flex items-center justify-center"
        >
          <span className="sm:hidden">+</span>
          <span className="hidden sm:inline">
            {showForm ? "Close Form" : "Add Note"}
          </span>
        </button>
      </div>

      {/* Note Form */}
      {showForm && (
        <div ref={formRef}>
          <NoteForm
            onAddNote={addNote}
            onUpdateNote={updateNote}
          />
        </div>
      )}

      {/* Loading and Notes List */}
      {loading ? (
        <p className="text-center text-sm sm:text-base ">Loading...</p>
      ) : (
        <>
          <NoteList notes={currentNotes} onDelete={removeNote} />
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

export default HomePage;