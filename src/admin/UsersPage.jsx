import { useEffect, useState } from "react";

const API = "http://localhost:5000";

const avatarColors = [
  { bg: "#EEF4FF", color: "#3060D0" },
  { bg: "#EDFAF3", color: "#1A7A4A" },
  { bg: "#FFF8E6", color: "#A06000" },
  { bg: "#FFF0F0", color: "#C0392B" },
  { bg: "#F3EEFF", color: "#6B3FA0" },
];

function initials(name = "") {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API}/api/users`)
      .then(r => r.json())
      .then(d => { setUsers(d.data || d || []); setLoading(false); })
      .catch(() => {
        // fallback mock data if no users endpoint
        setUsers([
          { id: 1, name: "Admin", email: "admin@news.com", role: "Admin", postCount: 12, status: "active", createdAt: "2026-01-01" },
          { id: 2, name: "Jane Smith", email: "jane@news.com", role: "Editor", postCount: 8, status: "active", createdAt: "2026-02-03" },
          { id: 3, name: "Mark Lee", email: "mark@news.com", role: "Editor", postCount: 4, status: "active", createdAt: "2026-03-10" },
          { id: 4, name: "Sara Kim", email: "sara@news.com", role: "Viewer", postCount: 0, status: "inactive", createdAt: "2026-04-05" },
        ]);
        setLoading(false);
      });
  }, []);

  const roleBadge = {
    Admin:  { bg: "#EEF4FF", color: "#3060D0" },
    Editor: { bg: "#EDFAF3", color: "#1A7A4A" },
    Viewer: { bg: "#F1EFE8", color: "#5F5E5A" },
  };

  const filtered = users.filter(u =>
    !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, color: "#1A1A1A", margin: 0 }}>Users</h1>
          <p style={{ fontSize: 13, color: "#999", margin: "4px 0 0" }}>{users.length} registered users</p>
        </div>
        <button style={{ padding: "9px 18px", background: "#1A1A1A", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          + Add User
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "1.25rem" }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          style={{ padding: "8px 12px", fontSize: 13, border: "0.5px solid #E0DDD6", borderRadius: 8, background: "#fff", width: 260, outline: "none", fontFamily: "'DM Sans', sans-serif" }}
        />
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "0.5px solid #E8E6E0", borderRadius: 14, overflow: "hidden" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#999", fontSize: 14 }}>Loading users...</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid #E8E6E0" }}>
                {["User", "Email", "Role", "Posts", "Status", "Joined", ""].map(h => (
                  <th key={h} style={{ textAlign: "left", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", color: "#aaa", fontWeight: 500, padding: "12px 16px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => {
                const av = avatarColors[i % avatarColors.length];
                const rb = roleBadge[user.role] || roleBadge.Viewer;
                return (
                  <tr key={user.id} style={{ borderBottom: "0.5px solid #F0EEE8" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: av.bg, color: av.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
                          {initials(user.name)}
                        </div>
                        <span style={{ fontWeight: 500, color: "#1A1A1A" }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#888" }}>{user.email}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 4, background: rb.bg, color: rb.color }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#666" }}>{user.postCount ?? 0}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: user.status === "active" ? "#1A7A4A" : "#999" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: user.status === "active" ? "#34C77B" : "#ccc", display: "inline-block" }} />
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#bbb", fontSize: 12 }}>
                      {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <button style={{ fontSize: 12, padding: "5px 12px", border: "0.5px solid #E0DDD6", borderRadius: 6, background: "#FAFAFA", cursor: "pointer", color: "#444" }}>
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
