import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mb-6 flex items-center w-full max-w-xs sm:max-w-md mx-auto bg-white rounded-full shadow-lg overflow-hidden transition-shadow hover:shadow-xl focus-within:shadow-xl"
    >
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 placeholder-gray-400 rounded-l-full focus:outline-none focus:ring-0 focus:shadow-md transition-shadow"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold rounded-r-full transition-shadow shadow-md hover:shadow-lg"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;