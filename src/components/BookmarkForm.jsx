function BookmarkForm() {
  return (
    <form className="bookmark-form">
      <input type="text" placeholder="Title" />
      <input type="text" placeholder="URL" />
      <textarea placeholder="Description" />
      <input type="text" placeholder="Tags (comma separated)" />
      <button type="submit">Save</button>
    </form>
  );
}

export default BookmarkForm;