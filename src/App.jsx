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
  const [currentView, setCurrentView] = useState("all"); // "all" | "archived"

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

  // Derived, not stored: filter by view, then sort pinned-first
  const visibleBookmarks = bookmarks
    .filter((b) => (currentView === "archived" ? b.archived : !b.archived))
    .sort((a, b) => (b.pinned === a.pinned ? 0 : b.pinned ? 1 : -1));

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar currentView={currentView} onChangeView={setCurrentView} />
        <main className="app-main">
          <SearchBar />
          <FilterBar />
          <SortSelect />
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