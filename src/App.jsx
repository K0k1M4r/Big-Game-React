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
  const showModal = false; // still dummy for now

  useEffect(() => {
    fetch("/data/bookmarks.json")
      .then((res) => res.json())
      .then((data) => {
        // simulate a real network delay so the loading state is visible
        setTimeout(() => {
          setBookmarks(data);
          setIsLoading(false);
        }, 800);
      })
      .catch((err) => {
        console.error("Failed to load bookmarks:", err);
        setIsLoading(false);
      });
  }, []); // empty array = run once, on mount

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <SearchBar />
          <FilterBar />
          <SortSelect />

          {isLoading ? (
            <p>Loading bookmarks...</p>
          ) : (
            <BookmarkList bookmarks={bookmarks} />
          )}
        </main>
      </div>
      {showModal && (
        <Modal>
          <BookmarkForm />
        </Modal>
      )}
    </div>
  );
}

export default App;