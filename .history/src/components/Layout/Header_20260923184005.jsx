import SearchBar from "../SearchBar";

function Header({ theme, onToggleTheme, searchTerm, onSearchChange, onAddClick }) {
  return (
    <header className="app-header">
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />

      <button className="add-bookmark-btn" onClick={onAddClick}>
        + Add Bookmark
      </button>

      <button
        className="theme-avatar-btn"
        onClick={onToggleTheme}
        title="Toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}

export default Header;