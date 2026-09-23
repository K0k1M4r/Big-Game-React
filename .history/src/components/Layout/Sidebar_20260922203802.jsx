function Sidebar({ currentView, onChangeView }) {
  return (
    <nav className="sidebar">
      <button
        className={currentView === "all" ? "active" : ""}
        onClick={() => onChangeView("all")}
      >
        All Bookmarks
      </button>
      <button
        className={currentView === "archived" ? "active" : ""}
        onClick={() => onChangeView("archived")}
      >
        Archived
      </button>
    </nav>
  );
}

export default Sidebar;