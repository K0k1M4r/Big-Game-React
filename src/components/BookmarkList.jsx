import BookmarkCard from "./BookmarkCard";

function BookmarkList({ bookmarks, onEdit, onDelete, onTogglePin, onToggleArchive, currentView, searchTerm }) {
  if (bookmarks.length === 0) {
    let message = "No bookmarks yet. Add one to get started!";

    if (searchTerm.trim()) {
      message = `No bookmarks match "${searchTerm}".`;
    } else if (currentView === "archived") {
      message = "No archived bookmarks.";
    }

    return <p className="empty-state">{message}</p>;
  }

  return (
    <div className="bookmark-list">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePin={onTogglePin}
          onToggleArchive={onToggleArchive}
        />
      ))}
    </div>
  );
}

export default BookmarkList;