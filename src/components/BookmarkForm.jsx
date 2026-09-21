import { useState } from "react";

function BookmarkForm({ onSave, initialData }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    url: initialData?.url || "",
    description: initialData?.description || "",
    tags: initialData?.tags.join(", ") || "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function isValidUrl(value) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  function validate() {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!form.url.trim()) {
      newErrors.url = "URL is required";
    } else if (!isValidUrl(form.url.trim())) {
      newErrors.url = "Please enter a valid URL";
    }

    const tagList = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (tagList.length === 0) {
      newErrors.tags = "At least one tag is required";
    }

    return { newErrors, tagList };
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { newErrors, tagList } = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const bookmarkData = {
      id: initialData ? initialData.id : crypto.randomUUID(),
      title: form.title.trim(),
      url: form.url.trim(),
      description: form.description.trim(),
      tags: tagList,
      pinned: initialData ? initialData.pinned : false,
      archived: initialData ? initialData.archived : false,
      favorite: initialData ? initialData.favorite : false,
      createdAt: initialData ? initialData.createdAt : new Date().toISOString(),
    };

    onSave(bookmarkData);
  }

  return (
    <form className="bookmark-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={form.url}
          onChange={handleChange}
        />
        {errors.url && <span className="error">{errors.url}</span>}
      </div>

      <div className="form-field">
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
        />
        {errors.tags && <span className="error">{errors.tags}</span>}
      </div>

      <button type="submit">{initialData ? "Save Changes" : "Save"}</button>
    </form>
  );
}

export default BookmarkForm;