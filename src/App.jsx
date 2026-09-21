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
    setIsModalOpen(false);
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
          <button onClick={() => setIsModalOpen(true)}>+ Add Bookmark</button>

          {isLoading ? (
            <p>Loading bookmarks...</p>
          ) : (
            <BookmarkList bookmarks={bookmarks} />
          )}
        </main>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <BookmarkForm onSave={handleAddBookmark} />
        </Modal>
      )}
    </div>
  );
}

export default App;