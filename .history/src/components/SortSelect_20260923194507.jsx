import { ArrowUpDown } from "lucide-react";

function SortSelect({ sortOption, onSortChange }) {
  return (
    <div className="sort-wrapper">
      <ArrowUpDown size={15} />
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
    </div>
  );
}

export default SortSelect;