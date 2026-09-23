import { useState, useRef, useEffect } from "react";
import { ArrowUpDown, Check } from "lucide-react";

const OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A-Z" },
  { value: "za", label: "Z-A" },
];

function SortSelect({ sortOption, onSortChange }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sort-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className="sort-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <ArrowUpDown size={15} />
        Sort by
      </button>

      {open && (
        <div className="sort-dropdown">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={opt.value === sortOption ? "active" : ""}
              onClick={() => {
                onSortChange(opt.value);
                setOpen(false);
              }}
            >
              <span>{opt.label}</span>
              {opt.value === sortOption && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortSelect;