import { FaFacebookF, FaViber } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";

function Footer() {
  const socialLinks = [
    { label: "Facebook", href: "#", Icon: FaFacebookF },
    { label: "Telegram", href: "#", Icon: FaTelegramPlane },
    { label: "Viber", href: "#", Icon: FaViber },
  ];

  const quickLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "News", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <footer className="border-t border-white/10 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 py-16">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
                Contact Us
              </h3>
              <p className="text-sm text-gray-400/90">
                Let us help you build your next big idea with modern, reliable
                digital experiences.
              </p>
              <div className="space-y-2 text-sm text-gray-400/90">
                <p>hello@yourcompany.com</p>
                <p>+1 (555) 123-4567</p>
                <p>123 Innovation Way, San Francisco, CA</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Social
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="group rounded-xl border border-white/10 bg-white/5 p-3 text-gray-300 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-blue-600/20 hover:text-white hover:shadow-[0_0_18px_rgba(59,130,246,0.35)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-gray-400/90">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Connect With Us
            </h3>
            <p className="text-sm text-gray-400/90">
              Join our community and stay updated with product launches and
              startup insights.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group rounded-xl border border-white/10 bg-white/5 p-3 text-gray-300 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-blue-600/20 hover:text-white hover:shadow-[0_0_18px_rgba(59,130,246,0.35)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          &copy; 2026 Your Company. Built with innovation.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
