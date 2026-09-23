import TagList from "./TagList";

function getInitial(title) {
  return title.charAt(0).toUpperCase();
}

function BookmarkCard({ bookmark, onEdit, onDelete, onTogglePin, onToggleArchive }) {
  let domain = "";
  try {
    domain = new URL(bookmark.url).hostname.replace("www.", "");
  } catch {
    domain = bookmark.url;
  }

  return (
    <div className={`bookmark-card ${bookmark.pinned ? "pinned" : ""}`}>
      <div className="bookmark-card-header">
        <div className="bookmark-favicon">{getInitial(bookmark.title)}</div>
        <div className="bookmark-title-group">
          <h3>{bookmark.title}</h3>
          <p className="bookmark-domain">{domain}</p>
        </div>
        {bookmark.pinned && <span className="pin-badge">📌</span>}
      </div>

      <div className="bookmark-divider" />

      <p className="description">{bookmark.description}</p>

      <TagList tags={bookmark.tags} />

      <div className="bookmark-divider" />

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