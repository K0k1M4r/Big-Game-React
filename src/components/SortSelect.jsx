function SortSelect({ sortOption, onSortChange }) {
  return (
    <select
      className="sort-select"
      value={sortOption}
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="az">A-Z</option>
      <option value="za">Z-A</option>
    </select>
  );
}

export default SortSelect;