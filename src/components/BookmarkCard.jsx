import TagList from "./TagList";

function BookmarkCard({ bookmark, onEdit, onDelete }) {
  return (
    <div className="bookmark-card">
      <h3>{bookmark.title}</h3>
      <p>{bookmark.url}</p>
      <p>{bookmark.description}</p>
      <TagList tags={bookmark.tags} />
      <div className="card-actions">
        <button>Pin</button>
        <button onClick={() => onEdit(bookmark)}>Edit</button>
        <button>Archive</button>
        <button onClick={() => onDelete(bookmark.id)}>Delete</button>
      </div>
    </div>
  );
}

export default BookmarkCard;