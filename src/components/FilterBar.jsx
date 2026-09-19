function FilterBar() {
  const dummyTags = ["All", "react", "docs", "javascript", "design"];

  return (
    <div className="filter-bar">
      {dummyTags.map((tag) => (
        <button key={tag}>{tag}</button>
      ))}
    </div>
  );
}

export default FilterBar;