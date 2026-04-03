import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/layout/navbar/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";

import Footer from "./component/layout/footer/Footer";



function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="App overflow-x-hidden">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;
