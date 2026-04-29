import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";

import Footer from "./component/layout/footer/Footer";
import Navbar from "./component/Navbar";



function App() {
  return (
    <div className="App overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;
