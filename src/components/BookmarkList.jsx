import BookmarkCard from "./BookmarkCard";

function BookmarkList({ bookmarks }) {
  if (bookmarks.length === 0) {
    return <p className="empty-state">No bookmarks yet. Add one to get started!</p>;
  }

  return (
    <div className="bookmark-list">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}

export default BookmarkList;