import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = "http://localhost:5000";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: ""});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const strength = (pw) => {
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const pw_strength = strength(form.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#E87171", "#E8C547", "#7EC87E", "#34C77B"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) { setError("Please fill in all fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.name, email: form.email, password: form.password, confirmPassword: form.confirm }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || "Registration failed");
      navigate("/login");
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
        .role-card { transition: border-color .15s, background .15s; cursor: pointer; }
        .role-card:hover { border-color: #444 !important; }
        
        @media (max-width: 768px) {
          .register-left { display: none !important; }
          .register-right { width: 100% !important; padding: 1.5rem !important; }
          .register-right h1 { font-size: 24px !important; }
          .register-right form { width: 100% !important; }
        }
        @media (max-width: 480px) {
          .register-right { padding: 1rem !important; }
          .register-right h1 { font-size: 20px !important; }
          .register-right input { font-size: 16px !important; }
        }
      `}</style>

      {/* Left panel */}
      <div className="register-left" style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "3rem", position: "relative", overflow: "hidden",
        borderRight: "0.5px solid #222",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: .04,
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <div style={{
          position: "absolute", width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,197,71,.10) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          animation: "shimmer 4s ease-in-out infinite",
        }} />

        <div style={{ position: "relative" }}>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#fff" }}>
            News<span style={{ color: "#E8C547" }}>Admin</span>
          </span>
        </div>

        <div style={{ position: "relative", animation: "fadeUp .6s ease both", animationDelay: ".1s" }}>
          <div style={{ fontSize: 11, color: "#555", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16 }}>Join the team</div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: "#fff", lineHeight: 1.15, margin: "0 0 20px", fontWeight: 400 }}>
            Start publishing<br /><em style={{ color: "#E8C547" }}>with confidence.</em>
          </h2>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, maxWidth: 320 }}>
            Create your account and get access to the full content management suite.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
          {[
            { icon: "✦", label: "Full article editor with image upload" },
            { icon: "✦", label: "Category and author management" },
            { icon: "✦", label: "Real-time content publishing" },
          ].map(f => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#E8C547", fontSize: 10 }}>{f.icon}</span>
              <span style={{ fontSize: 12.5, color: "#555" }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="register-right" style={{
        width: 480, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "3rem",
        animation: "fadeUp .5s ease both", overflowY: "auto",
      }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#fff", fontWeight: 400, margin: "0 0 8px" }}>
            Create account
          </h1>
          <p style={{ fontSize: 13.5, color: "#555", margin: 0 }}>Set up your  profile</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: 11, color: "#666", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>Full Name</label>
            <input className="auth-input" type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Jane Smith"
              style={{ width: "100%", padding: "11px 14px", background: "#161616", border: "0.5px solid #2A2A2A", borderRadius: 10, color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: 11, color: "#666", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>Email</label>
            <input className="auth-input" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@news.com"
              style={{ width: "100%", padding: "11px 14px", background: "#161616", border: "0.5px solid #2A2A2A", borderRadius: 10, color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }} />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ display: "block", fontSize: 11, color: "#666", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>Password</label>
            <div style={{ position: "relative" }}>
              <input className="auth-input" type={showPass ? "text" : "password"} value={form.password} onChange={e => set("password", e.target.value)} placeholder="Min. 6 characters"
                style={{ width: "100%", padding: "11px 40px 11px 14px", background: "#161616", border: "0.5px solid #2A2A2A", borderRadius: 10, color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#555", padding: 2 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
            {/* Strength bar */}
            {form.password && (
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 3, background: "#222", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pw_strength * 25}%`, background: strengthColor[pw_strength], borderRadius: 2, transition: "width .2s, background .2s" }} />
                </div>
                <span style={{ fontSize: 11, color: strengthColor[pw_strength], minWidth: 40 }}>{strengthLabel[pw_strength]}</span>
              </div>
            )}
          </div>

          {/* Confirm */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: 11, color: "#666", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>Confirm Password</label>
            <input className="auth-input" type="password" value={form.confirm} onChange={e => set("confirm", e.target.value)} placeholder="••••••••"
              style={{ width: "100%", padding: "11px 14px", background: "#161616", border: `0.5px solid ${form.confirm && form.confirm !== form.password ? "rgba(232,113,113,.4)" : "#2A2A2A"}`, borderRadius: 10, color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }} />
            {form.confirm && form.confirm !== form.password && (
              <p style={{ fontSize: 11.5, color: "#E87171", margin: "5px 0 0" }}>Passwords don't match</p>
            )}
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
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 13, color: "#444", marginTop: "1.5rem" }}>
          Already have an account?{" "}
          <Link to="/login" className="auth-link" style={{ color: "#666", textDecoration: "none", fontWeight: 500, transition: "color .15s" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
