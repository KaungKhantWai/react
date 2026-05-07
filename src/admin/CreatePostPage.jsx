import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = "http://localhost:5000";

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#666", marginBottom: 5, textTransform: "uppercase", letterSpacing: ".06em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "9px 12px", fontSize: 14,
  border: "0.5px solid #E0DDD6", borderRadius: 8,
  background: "#FAFAFA", color: "#1A1A1A",
  fontFamily: "'DM Sans', sans-serif", outline: "none",
  boxSizing: "border-box",
};

export default function CreatePostPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", category: "", author: "", paragraph: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
  if (!form.title || !form.category || !form.author || !form.paragraph) {
    setError("Please fill in all required fields.");
    return;
  }
  setSaving(true);
  setError("");
  try {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append("image", image);

    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/api/posts`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: fd,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || data.message || "Failed to create post");
    }

    navigate("/admin");
  } catch (e) {
    setError(e.message);
    setSaving(false);
  }
};

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.75rem" }}>
        <Link to="/admin" style={{ color: "#999", textDecoration: "none", fontSize: 13 }}>← Back</Link>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, color: "#1A1A1A", margin: 0 }}>Create Post</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, maxWidth: 960 }}>
        {/* Left: form */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E6E0", borderRadius: 14, padding: "1.75rem" }}>
          <Field label="Title *">
            <input style={inputStyle} value={form.title} onChange={e => set("title", e.target.value)} placeholder="Enter post title" />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Category *">
              <input style={inputStyle} value={form.category} onChange={e => set("category", e.target.value)} placeholder="Category" />
            </Field>
            <Field label="Author *">
              <input style={inputStyle} value={form.author} onChange={e => set("author", e.target.value)} placeholder="Author name" />
            </Field>
          </div>
          <Field label="Content *">
            <textarea
              style={{ ...inputStyle, minHeight: 220, resize: "vertical", lineHeight: 1.6 }}
              value={form.paragraph}
              onChange={e => set("paragraph", e.target.value)}
              placeholder="Write your article content here..."
            />
          </Field>

          {error && <div style={{ fontSize: 13, color: "#C0392B", background: "#FFF5F5", border: "0.5px solid #FDDCDC", borderRadius: 8, padding: "8px 12px", marginBottom: "1rem" }}>{error}</div>}

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleSubmit}
              disabled={saving}
              style={{ padding: "9px 22px", background: "#1A1A1A", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              {saving ? "Publishing..." : "Publish Post"}
            </button>
            <Link to="/admin" style={{ padding: "9px 18px", border: "0.5px solid #E0DDD6", borderRadius: 8, fontSize: 13, color: "#666", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              Cancel
            </Link>
          </div>
        </div>

        {/* Right: image */}
        <div>
          <div style={{ background: "#fff", border: "0.5px solid #E8E6E0", borderRadius: 14, padding: "1.5rem" }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#666", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 12 }}>Cover Image</div>
            {preview ? (
              <div>
                <img src={preview} alt="preview" style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8, marginBottom: 10 }} />
                <button onClick={() => { setImage(null); setPreview(null); }}
                  style={{ fontSize: 12, color: "#999", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Remove image
                </button>
              </div>
            ) : (
              <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 160, border: "1px dashed #E0DDD6", borderRadius: 8, cursor: "pointer", color: "#bbb", fontSize: 13, gap: 8 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                Click to upload image
                <input type="file" accept="image/*" onChange={handleImage} style={{ display: "none" }} />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
