import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:5000";

function StatCard({ label, value, sub }) {
  return (
    <div style={{ background: "#fff", border: "0.5px solid #E8E6E0", borderRadius: 12, padding: "1rem 1.25rem" }}>
      <div style={{ fontSize: 11, color: "#999", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".07em" }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 600, color: "#1A1A1A", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#bbb", marginTop: 5 }}>{sub}</div>}
    </div>
  );
}

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("");
  const [deleting, setDeleting] = useState(null);

  const catStyle = {
    technology: { bg: "#E6F1FB", color: "#185FA5" },
    lifestyle:  { bg: "#E1F5EE", color: "#0F6E56" },
    education:  { bg: "#FAEEDA", color: "#854F0B" },
  };

const fetchPosts = (searchTerm = "") => {
  setLoading(true);
  const query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : "";
  fetch(`${API}/api/posts${query}`)
    .then(r => r.json())
    .then(d => { setPosts(d.data || []); setLoading(false); })
    .catch(() => setLoading(false));
};

// ✅ load on mount
useEffect(() => { fetchPosts(); }, []);

// ✅ search debounce
useEffect(() => {
  const timeout = setTimeout(() => fetchPosts(search), 400);
  return () => clearTimeout(timeout);
}, [search]);

const categories = [...new Set(posts.map(p => p.category).filter(Boolean))];

// ✅ filtered for category only
const filtered = posts.filter(p => {
  return !cat || p.category === cat;
});

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setDeleting(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/posts/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const contentType = res.headers.get("content-type");
      const data = contentType?.includes("application/json") ? await res.json() : null;
      if (!res.ok) throw new Error(data?.error || data?.message || `Server error: ${res.status}`);
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      alert(e.message);
    } finally {
      setDeleting(null);
    }
  };


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, color: "#1A1A1A", margin: 0 }}>Posts</h1>
          <p style={{ fontSize: 13, color: "#999", margin: "4px 0 0" }}>{posts.length} articles published</p>
        </div>
        <Link to="/admin/create" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "9px 18px", background: "#1A1A1A", color: "#fff",
          borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: "none",
        }}>
          + New Post
        </Link>
      </div>

      {/* Stats — counts.total replaced with posts.length */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: "1.75rem" }}>
        <StatCard label="Total" value={posts.length} sub="all time" />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: "1.5rem" }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search posts..."
          style={{ padding: "8px 12px", fontSize: 13, border: "0.5px solid #E0DDD6", borderRadius: 8, background: "#fff", width: 240, outline: "none", fontFamily: "'DM Sans', sans-serif" }}
        />
        {/* categories from DB */}
        <select value={cat} onChange={e => setCat(e.target.value)}
          style={{ padding: "8px 12px", fontSize: 13, border: "0.5px solid #E0DDD6", borderRadius: 8, background: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          <option value="">All categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#999", fontSize: 14 }}>Loading posts...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#999", fontSize: 14 }}>No posts found.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {filtered.map(post => {
            const cs = catStyle[post.category] || { bg: "#F1EFE8", color: "#5F5E5A" };
            return (
              <div key={post.id} style={{ background: "#fff", border: "0.5px solid #E8E6E0", borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{
                  height: 140, background: "#F7F6F3",
                  backgroundImage: post.image ? `url(${API}/uploads/${post.image})` : "none",
                  backgroundSize: "cover", backgroundPosition: "center",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32, color: "#ccc",
                }}>
                  {!post.image && "📰"}
                </div>
                <div style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span style={{ display: "inline-block", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".07em", padding: "2px 8px", borderRadius: 4, background: cs.bg, color: cs.color, marginBottom: 8 }}>
                    {post.category}
                  </span>
                  <div style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.4, color: "#1A1A1A", marginBottom: 6, flex: 1 }}>
                    {post.title}
                  </div>
                  <div style={{ fontSize: 11, color: "#bbb", marginBottom: 12 }}>
                    By {post.author} · {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Link to={`/admin/edit/${post.id}`} style={{
                      flex: 1, textAlign: "center", padding: "6px 0", fontSize: 12, fontWeight: 500,
                      border: "0.5px solid #E0DDD6", borderRadius: 6, color: "#444", textDecoration: "none",
                      background: "#FAFAFA",
                    }}>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deleting === post.id}
                      style={{
                        flex: 1, padding: "6px 0", fontSize: 12, fontWeight: 500,
                        border: "0.5px solid #FDDCDC", borderRadius: 6, cursor: "pointer",
                        background: "#FFF5F5", color: "#C0392B",
                      }}>
                      {deleting === post.id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}