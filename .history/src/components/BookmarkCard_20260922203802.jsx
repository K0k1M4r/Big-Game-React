import TagList from "./TagList";

function BookmarkCard({ bookmark, onEdit, onDelete, onTogglePin, onToggleArchive }) {
  return (
    <div className={`bookmark-card ${bookmark.pinned ? "pinned" : ""}`}>
      {bookmark.pinned && <span className="pin-badge">📌 Pinned</span>}
      <h3>{bookmark.title}</h3>
      <p>{bookmark.url}</p>
      <p>{bookmark.description}</p>
      <TagList tags={bookmark.tags} />
      <div className="card-actions">
        <button onClick={() => onTogglePin(bookmark.id)}>
          {bookmark.pinned ? "Unpin" : "Pin"}
        </button>
        <button onClick={() => onEdit(bookmark)}>Edit</button>
        <button onClick={() => onToggleArchive(bookmark.id)}>
          {bookmark.archived ? "Restore" : "Archive"}
        </button>
        <button onClick={() => onDelete(bookmark.id)}>Delete</button>
      </div>
    </div>
  );
}

export default BookmarkCard;