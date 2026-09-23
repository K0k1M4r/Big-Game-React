import { Bookmark, Home, Archive, X } from "lucide-react";

function Sidebar({ currentView, onChangeView, tags = [], selectedTag, onSelectTag, isOpen, onClose }) {
  return (
    <nav className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-logo">
        <span className="logo-icon">
          <Bookmark size={18} />
        </span>
        Bookmark Manager

        <button
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      <button
        className={currentView === "all" ? "active" : ""}
        onClick={() => onChangeView("all")}
      >
        <Home size={18} /> Home
      </button>
      <button
        className={currentView === "archived" ? "active" : ""}
        onClick={() => onChangeView("archived")}
      >
        <Archive size={18} /> Archived
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