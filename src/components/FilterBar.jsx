function FilterBar({ tags, selectedTag, onSelectTag }) {
  return (
    <div className="filter-bar">
      {tags.map((tag) => (
        <button
          key={tag}
          className={tag === selectedTag ? "active" : ""}
          onClick={() => onSelectTag(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
