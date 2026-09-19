function TagList({ tags }) {
  return (
    <ul className="tag-list">
      {tags.map((tag) => (
        <li key={tag} className="tag">{tag}</li>
      ))}
    </ul>
  );
}

export default TagList