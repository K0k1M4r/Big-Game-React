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

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <SearchBar />
          <FilterBar />
          <SortSelect />
          <button onClick={openAddModal}>+ Add Bookmark</button>

          {isLoading ? (
            <p>Loading bookmarks...</p>
          ) : (
            <BookmarkList
              bookmarks={bookmarks}
              onEdit={openEditModal}
              onDelete={handleDeleteBookmark}
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