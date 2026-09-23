function Sidebar({ currentView, onChangeView, tags, selectedTag, onSelectTag }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">🔖</span>
        Bookmark Manager
      </div>

      <button
        className={currentView === "all" ? "active" : ""}
        onClick={() => onChangeView("all")}
      >
        🏠 Home
      </button>
      <button
        className={currentView === "archived" ? "active" : ""}
        onClick={() => onChangeView("archived")}
      >
        🗄 Archived
      </button>

      <p className="sidebar-tags-label">Tags</p>

      <div className="sidebar-tags">
        {tags.map(({ name, count }) => (
          <label key={name} className="sidebar-tag">
            <input
              type="checkbox"
              checked={selectedTag === name}
              onChange={() =>
                onSelectTag(selectedTag === name ? "All" : name)
              }
            />
            <span className="tag-name">{name}</span>
            <span className="tag-count">{count}</span>
          </label>
        ))}
      </div>
    </nav>
  );
}

export default Sidebar;