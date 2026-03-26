import "./Navbar.css";
import { useState } from "react";
import MegaMenu from "./MegaMenu";

function Navbar({ theme, onToggleTheme }) {
  const isDark = theme === "dark";

  const [activeMenu, setActiveMenu] = useState(null);

  const navItems = [
    { key: "about", label: "About Us", href: "#about" },
    { key: "news", label: "News", href: "#news" },
    { key: "services", label: "Services", href: "#services" },
    { key: "announcement", label: "Announcement", href: "#announcement" },
    { key: "law", label: "Law", href: "#law" },
  ];

  return (
    <div className="navbar-wrap">
      <header className="navbar">
        <div className="navbar__logo">
          <span className="navbar__logo-mark">MCALDF</span>
        </div>

        <div className="navbar__search">
          <input type="text" placeholder="Search" aria-label="Search" />
          <button className="navbar__search-btn" type="button">
            Search
          </button>
        </div>

        <div className="navbar__actions">
          <div className="navbar__lang">
            <select className="navbar__select" aria-label="Language">
              <option value="en">English</option>
              <option value="my">Myanmar</option>
            </select>
          </div>
          <button className="navbar__btn" type="button" onClick={onToggleTheme}>
            {isDark ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <nav className="subnav" aria-label="Primary">
        <div className="subnav__item">
          <a className="subnav__link" href="#home">Home</a>
        </div>
        {navItems.map((item) => (
          <div
            key={item.key}
            className="subnav__item has-mega"
            onMouseEnter={() => setActiveMenu(item.key)}
            onMouseLeave={() => setActiveMenu(null)}
            onFocus={() => setActiveMenu(item.key)}
            onBlur={() => setActiveMenu(null)}
          >
            <a
              className="subnav__link"
              href={item.href}
              aria-haspopup="true"
              aria-expanded={activeMenu === item.key}
            >
              {item.label}
            </a>
            <MegaMenu isOpen={activeMenu === item.key} label={item.label} />
          </div>
        ))}
      </nav>

    </div>
  );
}

export default Navbar;
