import { useState, useEffect } from "react";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const stored = localStorage.getItem("bookmarks");

    if (stored) {
      setTimeout(() => {
        setBookmarks(JSON.parse(stored));
        setIsLoading(false);
      }, 800);
    } else {
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
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks, isLoading]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

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

  function handleChangeView(view) {
    setCurrentView(view);
    setIsSidebarOpen(false);
  }

  function handleSelectTag(tag) {
    setSelectedTag(tag);
    setIsSidebarOpen(false);
  }

  const viewFiltered = bookmarks.filter((b) =>
    currentView === "archived" ? b.archived : !b.archived
  );

  const searchFiltered = viewFiltered.filter((b) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      b.title.toLowerCase().includes(term) ||
      b.description.toLowerCase().includes(term)
    );
  });

  const tagFiltered = searchFiltered.filter((b) =>
    selectedTag === "All" ? true : b.tags.includes(selectedTag)
  );

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

  const tagCounts = {};
  viewFiltered.forEach((b) => {
    b.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const tagsWithCounts = Object.keys(tagCounts)
    .sort()
    .map((name) => ({ name, count: tagCounts[name] }));

  const visibleBookmarks = sorted;

  return (
    <div className="app">
      <div className="app-body">
        <Sidebar
          currentView={currentView}
          onChangeView={handleChangeView}
          tags={tagsWithCounts}
          selectedTag={selectedTag}
          onSelectTag={handleSelectTag}
          isOpen={isSidebarOpen}
        />

        <div className="main-column">
          <Header
            theme={theme}
            onToggleTheme={toggleTheme}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddClick={openAddModal}
            onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          />

          <main className="app-main">
            <div className="content-header">
              <h2>{currentView === "archived" ? "Archived" : "All bookmarks"}</h2>
              <SortSelect sortOption={sortOption} onSortChange={setSortOption} />
            </div>

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
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <BookmarkForm
            key={editingBookmark ? editingBookmark.id : "new"}
            initialData={editingBookmark}
            onSave={editingBookmark ? handleUpdateBookmark : handleAddBookmark}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;