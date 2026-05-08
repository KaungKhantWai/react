import { useEffect, useState } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetails";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import Footer from "./component/layout/footer/Footer";
import Navbar from "./component/Navbar";
import AdminLayout from "./admin/AdminLayout";
import PostsPage from "./admin/PostsPage";
import CreatePostPage from "./admin/CreatePostPage";
import EditPostPage from "./admin/EditPostPage";
import UsersPage from "./admin/UsersPage";

const API = "http://localhost:5000";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

const clearStoredAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const isAdminUser = (user) => user?.role?.toLowerCase() === "admin";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function ProtectedAdminPage({ children, adminOnly = false }) {
  const location = useLocation();
  const [auth, setAuth] = useState({
    status: "checking",
    user: getStoredUser(),
  });

  useEffect(() => {
    let isActive = true;
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth({ status: "unauthenticated", user: null });
      return undefined;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`${API}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const contentType = res.headers.get("content-type");
        const data = contentType?.includes("application/json")
          ? await res.json()
          : null;

        if (!res.ok) {
          throw new Error(data?.message || "Authentication failed");
        }

        const user = data?.user || getStoredUser();

        if (adminOnly && !isAdminUser(user)) {
          if (isActive) {
            setAuth({ status: "forbidden", user });
          }
          return;
        }

        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        if (isActive) {
          setAuth({ status: "authenticated", user });
        }
      } catch (err) {
        console.error("Admin authentication failed:", err);
        clearStoredAuth();

        if (isActive) {
          setAuth({ status: "unauthenticated", user: null });
        }
      }
    };

    verifyToken();

    return () => {
      isActive = false;
    };
  }, [adminOnly]);

  if (auth.status === "checking") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F6F3",
          color: "#777",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Checking admin access...
      </div>
    );
  }

  if (auth.status === "unauthenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (auth.status === "forbidden") {
    return <Navigate to="/admin" replace />;
  }

  return <AdminLayout user={auth.user}>{children}</AdminLayout>;
}

function App() {
  return (
    <div className="App overflow-x-hidden">
      <Routes>
        // Public routes
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/home" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/news" element={<PublicLayout><News /></PublicLayout>} />
        <Route path="/posts/:id" element={<PublicLayout><NewsDetail /></PublicLayout>} />

        // Admin routes
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<ProtectedAdminPage><PostsPage /></ProtectedAdminPage>} />
        <Route path="/admin/create" element={<ProtectedAdminPage><CreatePostPage /></ProtectedAdminPage>} />
        <Route path="/admin/edit/:id" element={<ProtectedAdminPage><EditPostPage /></ProtectedAdminPage>} />
        <Route path="/admin/users" element={<ProtectedAdminPage adminOnly><UsersPage /></ProtectedAdminPage>} />
      </Routes>
    </div>
  );
}

export default App;
