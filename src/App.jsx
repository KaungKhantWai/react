import { Routes, Route } from "react-router-dom";
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

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function AdminPage({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
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
        <Route path="/admin" element={<AdminPage><PostsPage /></AdminPage>} />
        <Route path="/admin/create" element={<AdminPage><CreatePostPage /></AdminPage>} />
        <Route path="/admin/edit/:id" element={<AdminPage><EditPostPage /></AdminPage>} />
        <Route path="/admin/users" element={<AdminPage><UsersPage /></AdminPage>} />
      </Routes>
    </div>
  );
}

export default App;
