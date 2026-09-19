import TagList from "./TagList";

function BookmarkCard({ bookmark }) {
  return (
    <div className="bookmark-card">
      <h3>{bookmark.title}</h3>
      <p>{bookmark.url}</p>
      <p>{bookmark.description}</p>
      <TagList tags={bookmark.tags} />
      <div className="card-actions">
        <button>Pin</button>
        <button>Edit</button>
        <button>Archive</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default BookmarkCard;