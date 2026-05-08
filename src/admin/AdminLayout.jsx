import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    return {};
  }
};

const NAV = [
  {
    label: "Content",
    items: [
      { to: "/admin", icon: "grid", label: "Posts" },
      { to: "/admin/create", icon: "plus", label: "Create Post" },
    ],
  },
  {
    label: "Management",
    items: [
      { to: "/admin/users", icon: "users", label: "Users", adminOnly: true },
    ],
  },
  {
    label: "Settings",
    items: [
      { to: "/admin/settings", icon: "settings", label: "Settings" },
    ],
  },
  {
    label: "Logout",
    items: [
      { to: "/admin/logout", icon: "logout", label: "Logout" },
    ],
  }
];

const icons = {
  grid: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/>
      <rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/>
    </svg>
  ),
  plus: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6"/><line x1="8" y1="5" x2="8" y2="11"/><line x1="5" y1="8" x2="11" y2="8"/>
    </svg>
  ),
  users: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="5" r="2.5"/><path d="M1 13c0-3 2-5 5-5s5 2 5 5"/>
      <circle cx="12" cy="5" r="2"/><path d="M12 10c1.5 0 3 1 3 3"/>
    </svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="2.5"/>
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M3.2 12.8l1.4-1.4M11.4 4.6l1.4-1.4"/>
    </svg>
  ),
  logout: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>
      <polyline points="11 11 14 8 11 5"/>
      <line x1="14" y1="8" x2="6" y2="8"/>
    </svg>
  ),
};

export default function AdminLayout({ children, user: authenticatedUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const user = authenticatedUser || getStoredUser();
  const isAdmin = user.role?.toLowerCase() === "admin";
  const visibleNav = NAV.map((section) => ({
    ...section,
    items: section.items.filter((item) => !item.adminOnly || isAdmin),
  })).filter((section) => section.items.length > 0);

  // ✅ Fix 1: handleLogout was missing
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F7F6F3", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar { position: fixed !important; left: 0; top: 0; height: 100vh; z-index: 999; box-shadow: 2px 0 8px rgba(0,0,0,0.15); }
          .admin-sidebar.collapsed { transform: translateX(-100%); }
          .admin-sidebar-overlay { display: block !important; }
          .admin-main { padding: 1rem !important; }
          .admin-main.has-mobile-sidebar { margin-left: 220px; }
        }
        @media (max-width: 480px) {
          .admin-sidebar { width: 100% !important; min-width: 100% !important; }
          .admin-main.has-mobile-sidebar { margin-left: 0 !important; }
          .admin-main { padding: 0.75rem !important; }
        }
      `}</style>

      {/* Sidebar */}
      <aside className={`admin-sidebar${collapsed ? ' collapsed' : ''}`} style={{
        width: collapsed ? 64 : 220,
        minWidth: collapsed ? 64 : 220,
        background: "#1A1A1A",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem 0",
        transition: "width .2s, min-width .2s, transform .3s",
        overflow: "hidden",
      }}>
        {/* Logo */}
        <div style={{ padding: "0 1.25rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {!collapsed && (
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#fff", whiteSpace: "nowrap" }}>
              News<span style={{ color: "#E8C547" }}>Admin</span>
            </span>
          )}
          <button onClick={() => setCollapsed(!collapsed)} style={{
            background: "none", border: "none", cursor: "pointer", color: "#888", padding: 4,
            marginLeft: collapsed ? "auto" : 0, marginRight: collapsed ? "auto" : 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="2" y1="4" x2="14" y2="4"/><line x1="2" y1="8" x2="14" y2="8"/><line x1="2" y1="12" x2="14" y2="12"/>
            </svg>
          </button>
        </div>

        {/* Nav */}
        {visibleNav.map(section => (
          <div key={section.label} style={{ marginBottom: "1.5rem" }}>
            {!collapsed && (
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: ".1em", padding: "0 1.25rem", marginBottom: 4 }}>
                {section.label}
              </div>
            )}
            {section.items.map(item => {
              const active = location.pathname === item.to;

              // ✅ Fix 2: if block now properly closed, and normal Link return added below
              if (item.icon === "logout") {
                return (
                  <button
                    key={item.to}
                    onClick={handleLogout}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, width: "100%",
                      padding: collapsed ? "9px 0" : "9px 1.25rem",
                      justifyContent: collapsed ? "center" : "flex-start",
                      color: "#e05252",
                      background: "none",
                      borderWidth: "0 0 0 2px", borderStyle: "solid", borderColor: "transparent",
                      cursor: "pointer", fontSize: 13.5, fontWeight: 400,
                      transition: "all .12s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#ff6b6b"}
                    onMouseLeave={e => e.currentTarget.style.color = "#e05252"}
                  >
                    <span style={{ flexShrink: 0 }}>{icons.logout}</span>
                    {!collapsed && <span style={{ whiteSpace: "nowrap" }}>Logout</span>}
                  </button>
                );
              }

              return (
                <Link key={item.to} to={item.to} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: collapsed ? "9px 0" : "9px 1.25rem",
                  justifyContent: collapsed ? "center" : "flex-start",
                  color: active ? "#E8C547" : "#999",
                  textDecoration: "none", fontSize: 13.5, fontWeight: active ? 500 : 400,
                  background: active ? "rgba(232,197,71,.08)" : "none",
                  borderLeft: active ? "2px solid #E8C547" : "2px solid transparent",
                  transition: "all .12s",
                }}>
                  <span style={{ flexShrink: 0 }}>{icons[item.icon]}</span>
                  {!collapsed && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}

        <div style={{ marginTop: "auto", padding: "0 1.25rem" }}>
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: "0.5px solid #333" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E8C547", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#1A1A1A" }}>{user.username?.charAt(0).toUpperCase() || "?"}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#eee" }}>{user.username || "Unknown"}</div>
                <div style={{ fontSize: 10, color: "#666" }}>{user.email || "admin@news.com"}</div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main" style={{ flex: 1, overflowY: "auto", padding: "2rem 2.5rem" }}>
        {children}
      </main>
    </div>
  );
}
