import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const API = "http://localhost:5000";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/admin";
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || "Invalid credentials");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      fontFamily: "'DM Sans', sans-serif",
      background: "#0F0F0F",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%,100% { opacity:.3; } 50% { opacity:.7; } }
        .auth-input { transition: border-color .15s, background .15s; }
        .auth-input:focus { border-color: #E8C547 !important; background: #1C1C1C !important; outline: none; }
        .auth-btn:hover { background: #E8C547 !important; color: #0F0F0F !important; }
        .auth-btn:active { transform: scale(.98); }
        .auth-link:hover { color: #E8C547 !important; }
        
        @media (max-width: 768px) {
          .login-left { display: none !important; }
          .login-right { width: 100% !important; padding: 1.5rem !important; }
          .login-right h1 { font-size: 24px !important; }
          .login-right form { width: 100% !important; }
        }
        @media (max-width: 480px) {
          .login-right { padding: 1rem !important; }
          .login-right h1 { font-size: 20px !important; }
          .login-right input { font-size: 16px !important; }
        }
      `}</style>

      {/* Left panel — decorative */}
      <div className="login-left" style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "3rem", position: "relative", overflow: "hidden",
        borderRight: "0.5px solid #222",
      }}>
        {/* Grid pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: .04,
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        {/* Accent circle */}
        <div style={{
          position: "absolute", width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,197,71,.12) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          animation: "shimmer 4s ease-in-out infinite",
        }} />

        <div style={{ position: "relative" }}>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#fff" }}>
            News<span style={{ color: "#E8C547" }}>Admin</span>
          </span>
        </div>

        <div style={{ position: "relative", animation: "fadeUp .6s ease both", animationDelay: ".1s" }}>
          <div style={{ fontSize: 11, color: "#555", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16 }}>Content Management</div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: "#fff", lineHeight: 1.15, margin: "0 0 20px", fontWeight: 400 }}>
            Your stories,<br /><em style={{ color: "#E8C547" }}>your platform.</em>
          </h2>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, maxWidth: 320 }}>
            Manage articles, authors, and audiences — all from one clean dashboard.
          </p>
        </div>

        <div style={{ display: "flex", gap: 24, position: "relative" }}>
          {["24 Posts", "3 Authors", "2.4k Readers"].map(s => (
            <div key={s}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#E8C547" }}>{s.split(" ")[0]}</div>
              <div style={{ fontSize: 11, color: "#555" }}>{s.split(" ")[1]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="login-right" style={{
        width: 460, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "3rem",
        animation: "fadeUp .5s ease both",
      }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#fff", fontWeight: 400, margin: "0 0 8px" }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 13.5, color: "#555", margin: 0 }}>Sign in to your admin account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: "1.1rem" }}>
            <label style={{ display: "block", fontSize: 11, color: "#666", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>Email</label>
            <input
              className="auth-input"
              type="email"
              value={form.email}
              onChange={e => set("email", e.target.value)}
              placeholder="admin@news.com"
              style={{ width: "100%", padding: "11px 14px", background: "#161616", border: "0.5px solid #2A2A2A", borderRadius: 10, color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: 11, color: "#666", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                className="auth-input"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={e => set("password", e.target.value)}
                placeholder="••••••••"
                style={{ width: "100%", padding: "11px 40px 11px 14px", background: "#161616", border: "0.5px solid #2A2A2A", borderRadius: 10, color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#555", padding: 2 }}>
                {showPass
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          {error && (
            <div style={{ fontSize: 12.5, color: "#E87171", background: "rgba(232,113,113,.08)", border: "0.5px solid rgba(232,113,113,.2)", borderRadius: 8, padding: "9px 12px", marginBottom: "1.25rem" }}>
              {error}
            </div>
          )}

          <button type="submit" className="auth-btn" disabled={loading} style={{
            width: "100%", padding: "12px", background: "#fff", color: "#0F0F0F",
            border: "none", borderRadius: 10, fontSize: 14, fontWeight: 500,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background .15s, color .15s",
          }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 13, color: "#444", marginTop: "1.75rem" }}>
          Don't have an account?{" "}
          <Link to="/register" className="auth-link" style={{ color: "#666", textDecoration: "none", fontWeight: 500, transition: "color .15s" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
