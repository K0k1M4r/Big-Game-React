import { useState } from "react";

const DESCRIPTION_MAX = 280;

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function BookmarkForm({ onSave, onCancel, initialData }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    url: initialData?.url || "",
    description: initialData?.description || "",
    tags: initialData?.tags.join(", ") || "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "description" && value.length > DESCRIPTION_MAX) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";

    if (!form.url.trim()) {
      newErrors.url = "URL is required";
    } else if (!isValidUrl(form.url.trim())) {
      newErrors.url = "Please enter a valid URL";
    }

    const tagList = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
    if (tagList.length === 0) newErrors.tags = "At least one tag is required";

    return { newErrors, tagList };
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { newErrors, tagList } = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      pinned: false,
      archived: false,
      favorite: false,
      ...initialData,
      id: initialData?.id ?? crypto.randomUUID(),
      title: form.title.trim(),
      url: form.url.trim(),
      description: form.description.trim(),
      tags: tagList,
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
    });
  }

  return (
    <form className="bookmark-form" onSubmit={handleSubmit}>
      <h2 className="form-title">
        {initialData ? "Edit bookmark" : "Add a bookmark"}
      </h2>
      <p className="form-subtitle">
        {initialData
          ? "Update the details for this bookmark."
          : "Save a link with details to keep your collection organized. We extract the favicon automatically from the URL."}
      </p>

      <div className="form-field">
        <label htmlFor="title">Title *</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <span className="char-count">
          {form.description.length}/{DESCRIPTION_MAX}
        </span>
      </div>

      <div className="form-field">
        <label htmlFor="url">Website URL *</label>
        <input id="url" name="url" value={form.url} onChange={handleChange} />
        {errors.url && <span className="error">{errors.url}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="tags">Tags *</label>
        <input
          id="tags"
          name="tags"
          placeholder="e.g. Design, Learning, Tools"
          value={form.tags}
          onChange={handleChange}
        />
        {errors.tags && <span className="error">{errors.tags}</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="form-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="form-submit">
          {initialData ? "Save Changes" : "Add Bookmark"}
        </button>
      </div>
    </form>
  );
}

export default BookmarkForm;