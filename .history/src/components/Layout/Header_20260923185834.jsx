import SearchBar from "../SearchBar";

function Header({ theme, onToggleTheme, searchTerm, onSearchChange, onAddClick, onMenuClick }) {
  return (
    <header className="app-header">
      <button className="menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
        ☰
      </button>

      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />

      <button className="add-bookmark-btn" onClick={onAddClick}>
        <span className="add-bookmark-text">+ Add Bookmark</span>
        <span className="add-bookmark-icon">+</span>
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