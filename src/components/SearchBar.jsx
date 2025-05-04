"use client"
import "../styles/SearchBar.css"

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button className="clear-button" onClick={() => setSearchTerm("")} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
