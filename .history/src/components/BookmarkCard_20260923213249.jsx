import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Eye,
  Calendar,
  Clock,
  Pin,
  PinOff,
  ExternalLink,
  Copy,
  Pencil,
  Archive,
  Trash2,
} from "lucide-react";
import TagList from "./TagList";

function getInitial(title) {
  return title.charAt(0).toUpperCase();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

// Not a real analytics number — this app doesn't track views.
// Derived deterministically from the bookmark id so it stays stable
// across renders instead of changing randomly.
function pseudoViewCount(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 1000;
  }
  return Math.abs(hash);
}

function BookmarkCard({ bookmark, onEdit, onDelete, onTogglePin, onToggleArchive }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let domain = "";
  try {
    domain = new URL(bookmark.url).hostname.replace("www.", "");
  } catch {
    domain = bookmark.url;
  }

  function handleCopyUrl() {
    navigator.clipboard.writeText(bookmark.url);
    setMenuOpen(false);
  }

  return (
    <div className={`bookmark-card ${bookmark.pinned ? "pinned" : ""}`}>
      <div className="bookmark-card-header">
        <div className="bookmark-favicon">{getInitial(bookmark.title)}</div>
        <div className="bookmark-title-group">
          <h3>{bookmark.title}</h3>
          <p className="bookmark-domain">{domain}</p>
        </div>

        <div className="card-menu" ref={menuRef}>
          <button
            className="card-menu-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="More actions"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div className="card-menu-dropdown">
              
               <a href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                <ExternalLink size={16} /> Visit
              </a>
              <button onClick={handleCopyUrl}>
                <Copy size={16} /> Copy URL
              </button>
              <button
                onClick={() => {
                  onTogglePin(bookmark.id);
                  setMenuOpen(false);
                }}
              >
                {bookmark.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                {bookmark.pinned ? "Unpin" : "Pin"}
              </button>
              <button
                onClick={() => {
                  onEdit(bookmark);
                  setMenuOpen(false);
                }}
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={() => {
                  onToggleArchive(bookmark.id);
                  setMenuOpen(false);
                }}
              >
                <Archive size={16} /> {bookmark.archived ? "Restore" : "Archive"}
              </button>
              <button
                className="menu-delete"
                onClick={() => {
                  onDelete(bookmark.id);
                  setMenuOpen(false);
                }}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bookmark-divider" />

      <p className="description">{bookmark.description}</p>

      <TagList tags={bookmark.tags} />

      <div className="bookmark-divider" />

      <div className="bookmark-meta">
        <span className="meta-item">
          <Eye size={14} /> {pseudoViewCount(bookmark.id)}
        </span>
        <span className="meta-item">
          <Clock size={14} /> {formatDate(bookmark.createdAt)}
        </span>
        <span className="meta-item">
          <Calendar size={14} /> {formatDate(bookmark.createdAt)}
        </span>

        <button
          className={`pin-icon-btn ${bookmark.pinned ? "active" : ""}`}
          onClick={() => onTogglePin(bookmark.id)}
          aria-label={bookmark.pinned ? "Unpin" : "Pin"}
        >
          <Pin size={16} />
        </button>
      </div>
    </div>
  );
}

export default BookmarkCard;