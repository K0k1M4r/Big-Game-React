import { useState, useEffect } from "react";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import SortSelect from "./components/SortSelect";
import BookmarkList from "./components/BookmarkList";
import Modal from "./components/Modal";
import BookmarkForm from "./components/BookmarkForm";

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [currentView, setCurrentView] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    fetch("/data/bookmarks.json")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setBookmarks(data);
          setIsLoading(false);
        }, 800);
      })
      .catch((err) => {
        console.error("Failed to load bookmarks:", err);
        setIsLoading(false);
      });
  }, []);

  function handleAddBookmark(newBookmark) {
    setBookmarks((prev) => [...prev, newBookmark]);
    closeModal();
  }

  function handleUpdateBookmark(updatedBookmark) {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === updatedBookmark.id ? updatedBookmark : b))
    );
    closeModal();
  }

  function handleDeleteBookmark(id) {
    const confirmed = window.confirm("Delete this bookmark?");
    if (!confirmed) return;
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }

  function handleTogglePin(id) {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, pinned: !b.pinned } : b))
    );
  }

  function handleToggleArchive(id) {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, archived: !b.archived } : b))
    );
  }

  function openAddModal() {
    setEditingBookmark(null);
    setIsModalOpen(true);
  }

  function openEditModal(bookmark) {
    setEditingBookmark(bookmark);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingBookmark(null);
  }

  // ---- Derived data, computed fresh every render ----

  // 1. Filter by view (all vs archived)
  const viewFiltered = bookmarks.filter((b) =>
    currentView === "archived" ? b.archived : !b.archived
  );

  // 2. Filter by search term (title + description)
  const searchFiltered = viewFiltered.filter((b) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      b.title.toLowerCase().includes(term) ||
      b.description.toLowerCase().includes(term)
    );
  });

  // 3. Filter by selected tag
  const tagFiltered = searchFiltered.filter((b) =>
    selectedTag === "All" ? true : b.tags.includes(selectedTag)
  );

  // 4. Sort (pinned always first, then by chosen sort)
  const sorted = [...tagFiltered].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;

    switch (sortOption) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // 5. All unique tags, for the FilterBar
  const allTags = ["All", ...new Set(bookmarks.flatMap((b) => b.tags))];

  const visibleBookmarks = sorted;

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar currentView={currentView} onChangeView={setCurrentView} />
        <main className="app-main">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <FilterBar
            tags={allTags}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
          />
          <SortSelect sortOption={sortOption} onSortChange={setSortOption} />
          <button onClick={openAddModal}>+ Add Bookmark</button>

          {isLoading ? (
            <p>Loading bookmarks...</p>
          ) : (
            <BookmarkList
              bookmarks={visibleBookmarks}
              onEdit={openEditModal}
              onDelete={handleDeleteBookmark}
              onTogglePin={handleTogglePin}
              onToggleArchive={handleToggleArchive}
              currentView={currentView}
              searchTerm={searchTerm}
            />
          )}
        </main>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <BookmarkForm
            key={editingBookmark ? editingBookmark.id : "new"}
            initialData={editingBookmark}
            onSave={editingBookmark ? handleUpdateBookmark : handleAddBookmark}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;