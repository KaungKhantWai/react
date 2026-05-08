import { useEffect, useState } from "react";

const API = "http://localhost:5000";
const ROLE_OPTIONS = ["admin", "user"];

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

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    return {};
  }
}

function getUsersFromResponse(data) {
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.users)) return data.users;
  if (Array.isArray(data)) return data;
  return [];
}

function getUserName(user) {
  return user.username || user.name || "Unknown";
}

function getUserRole(user) {
  return user.role?.toLowerCase() || "user";
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingRole, setUpdatingRole] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  const currentUser = getStoredUser();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API}/api/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async r => {
        const contentType = r.headers.get("content-type");
        const data = contentType?.includes("application/json") ? await r.json() : null;

        if (!r.ok) {
          throw new Error(data?.message || data?.error || "Failed to load users");
        }

        return data;
      })
      .then(d => { setUsers(getUsersFromResponse(d)); setLoading(false); })
      .catch((err) => {
        setError(err.message);
        setUsers([]);
        setLoading(false);
      });
  }, []);

  const roleBadge = {
    admin:  { bg: "#EEF4FF", color: "#3060D0" },
    user: { bg: "#F1EFE8", color: "#5F5E5A" },
  };

  const filtered = users.filter(u =>
    !search ||
    getUserName(u).toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    getUserRole(u).includes(search.toLowerCase())
  );

  const handleRoleChange = async (id, role) => {
    setUpdatingRole(id);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/users/${id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });
      const contentType = res.headers.get("content-type");
      const data = contentType?.includes("application/json") ? await res.json() : null;

      if (!res.ok) {
        throw new Error(data?.message || data?.error || "Failed to update role");
      }

      setUsers(prev =>
        prev.map(user => user.id === id ? { ...user, role } : user)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingRole(null);
    }
  };

  const handleDelete = async (user) => {
    if (String(user.id) === String(currentUser.id)) {
      setError("You cannot delete your own account while signed in.");
      return;
    }

    if (!window.confirm(`Delete ${getUserName(user)}?`)) return;

    setDeleting(user.id);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/users/${user.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const contentType = res.headers.get("content-type");
      const data = contentType?.includes("application/json") ? await res.json() : null;

      if (!res.ok) {
        throw new Error(data?.message || data?.error || "Failed to delete user");
      }

      setUsers(prev => prev.filter(item => item.id !== user.id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, color: "#1A1A1A", margin: 0 }}>Users</h1>
          <p style={{ fontSize: 13, color: "#999", margin: "4px 0 0" }}>{users.length} registered users</p>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "1.25rem" }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          style={{ padding: "8px 12px", fontSize: 13, border: "0.5px solid #E0DDD6", borderRadius: 8, background: "#fff", width: 260, outline: "none", fontFamily: "'DM Sans', sans-serif" }}
        />
      </div>

      {error && (
        <div style={{ fontSize: 13, color: "#C0392B", background: "#FFF5F5", border: "0.5px solid #FDDCDC", borderRadius: 8, padding: "8px 12px", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      {/* Table */}
      <div style={{ background: "#fff", border: "0.5px solid #E8E6E0", borderRadius: 14, overflow: "hidden" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#999", fontSize: 14 }}>Loading users...</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid #E8E6E0" }}>
                {["User", "Email", "Role", "Posts", "Status", "Joined", "Actions"].map(h => (
                  <th key={h} style={{ textAlign: "left", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", color: "#aaa", fontWeight: 500, padding: "12px 16px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => {
                const av = avatarColors[i % avatarColors.length];
                const name = getUserName(user);
                const role = getUserRole(user);
                const rb = roleBadge[role] || roleBadge.user;
                const isCurrentUser = String(user.id) === String(currentUser.id);
                return (
                  <tr key={user.id} style={{ borderBottom: "0.5px solid #F0EEE8" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: av.bg, color: av.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
                          {initials(name)}
                        </div>
                        <span style={{ fontWeight: 500, color: "#1A1A1A" }}>{name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#888" }}>{user.email}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 4, background: rb.bg, color: rb.color, textTransform: "capitalize" }}>
                          {role}
                        </span>
                        <select
                          value={role}
                          disabled={updatingRole === user.id || isCurrentUser}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          style={{ padding: "5px 8px", fontSize: 12, border: "0.5px solid #E0DDD6", borderRadius: 6, background: "#FAFAFA", color: "#444", cursor: isCurrentUser ? "not-allowed" : "pointer" }}
                        >
                          {ROLE_OPTIONS.map(option => (
                            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#666" }}>{user.postCount ?? 0}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: user.status === "inactive" ? "#999" : "#1A7A4A" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: user.status === "inactive" ? "#ccc" : "#34C77B", display: "inline-block" }} />
                        {user.status === "inactive" ? "Inactive" : "Active"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#bbb", fontSize: 12 }}>
                      {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <button
                        disabled={deleting === user.id || isCurrentUser}
                        onClick={() => handleDelete(user)}
                        style={{ fontSize: 12, padding: "5px 12px", border: "0.5px solid #FDDCDC", borderRadius: 6, background: "#FFF5F5", cursor: isCurrentUser ? "not-allowed" : "pointer", color: "#C0392B", opacity: isCurrentUser ? 0.45 : 1 }}
                      >
                        {deleting === user.id ? "Deleting..." : "Delete"}
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
