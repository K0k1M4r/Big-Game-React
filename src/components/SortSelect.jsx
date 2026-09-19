function SortSelect() {
  return (
    <select className="sort-select">
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="az">A-Z</option>
      <option value="za">Z-A</option>
    </select>
  );
}

export default SortSelect;