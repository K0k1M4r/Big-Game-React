function Header({ theme, onToggleTheme }) {
  return (
    <header className="app-header">
      <h1>Bookmark Manager</h1>
      <button onClick={onToggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </header>
  );
}

export default Header;