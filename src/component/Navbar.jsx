import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="border-b border-gray-200"
      style={{
        backgroundColor: "var(--color-white)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Top Bar */}
      <div className=" flex items-center justify-between px-6 md:px-8 h-16">
        
        {/* Logo */}
        <a href="/home" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="MCALDF logo"
            className="h-8 w-auto"
          />

          <span className="text-xl font-semibold text-gray-900">
            MCALDF
          </span>
        </a>

        {/* Desktop Links */}
        <ul className=" hidden md:flex gap-8 list-none">
          <li>
            <a
              href="/home"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="/about"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              About
            </a>
          </li>

          <li>
            <a
              href="/news"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              News
            </a>
          </li>

          <li>
            <a
              href="/contact"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-900"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-5">
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="/home"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="/about"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="/news"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                News
              </a>
            </li>

            <li>
              <a
                href="/contact"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}