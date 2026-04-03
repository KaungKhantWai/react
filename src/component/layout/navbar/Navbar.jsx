import "./Navbar.css";
import { useState } from "react";
import MegaMenu from "./MegaMenu";

function Navbar({ theme, onToggleTheme }) {
  const isDark = theme === "dark";

  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="navbar-wrap">
      <header className="navbar !grid-cols-[1fr_auto] !gap-3 md:!grid-cols-[auto_1fr_auto] md:!gap-4">
        <div className="navbar__logo">
          <span className="navbar__logo-mark">MCALDF</span>
        </div>

        <div className="navbar__search !hidden md:!grid">
          <input type="text" placeholder="Search" aria-label="Search" />
          <button className="navbar__search-btn" type="button">
            Search
          </button>
        </div>

        <div className="navbar__actions !items-center">
          <div className="navbar__lang !hidden md:!block">
            <select className="navbar__select" aria-label="Language">
              <option value="en">English</option>
              <option value="my">Myanmar</option>
            </select>
          </div>
          <button className="navbar__btn" type="button" onClick={onToggleTheme}>
            {isDark ? "Light" : "Dark"}
          </button>
          <button
            className="navbar__btn !p-2 md:!hidden"
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-nav"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      <nav className="subnav !hidden md:!flex" aria-label="Primary">
        <div className="subnav__item">
          <a className="subnav__link" href="/home">Home</a>
        </div>
        {/* 
        
        */}

        <div className="subnav__item">
          <a className="subnav__link" href="/about">About Us</a>
        </div>

        <div className="subnav__item">
          <a className="subnav__link" href="#home">News</a>
        </div>

        <div className="subnav__item">
          <a className="subnav__link" href="#home">Services</a>
        </div>
      </nav>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="subnav md:!hidden !flex !flex-col !items-stretch !justify-start !gap-2 !py-4"
          aria-label="Mobile"
        >
          <div className="subnav__item !w-full">
            <a
              className="subnav__link !w-full !py-2"
              href="/home"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </a>
          </div>
          <div className="subnav__item !w-full">
            <a
              className="subnav__link !w-full !py-2"
              href="/about"
              onClick={() => setMobileOpen(false)}
            >
              About Us
            </a>
          </div>
          <div className="subnav__item !w-full">
            <a
              className="subnav__link !w-full !py-2"
              href="#home"
              onClick={() => setMobileOpen(false)}
            >
              News
            </a>
          </div>
          <div className="subnav__item !w-full">
            <a
              className="subnav__link !w-full !py-2"
              href="#home"
              onClick={() => setMobileOpen(false)}
            >
              Service
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
