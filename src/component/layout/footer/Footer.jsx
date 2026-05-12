export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIconStyle = {
    background: "rgba(255,255,255,0.08)",
    border: "0.5px solid rgba(255,255,255,0.15)",
  };

  return (
    <footer
      style={{ backgroundColor: "var(--color-primary)" }}
      className="px-6 md:px-16 pt-16 pb-6 text-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Column 1 — Logo + Social */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/mcaldfLogo.png" alt="logo" className="h-8 w-auto" />
            <span
              className="text-xl font-bold"
              style={{
                color: "var(--color-white)",
                fontFamily: "var(--font-heading)",
              }}
            >
              MCALDF
            </span>
          </div>

          <p
            className="text-sm leading-relaxed mb-6 opacity-80"
            style={{
              color: "var(--color-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Myanmar-China Agricultural & Livestock Development Foundation. Promoting economic development and sustaining long-term friendship between Myanmar and China.
          </p>

          {/* Social icons with Hover */}
          <div className="flex gap-3">
            {[
              {
                id: "fb",
                icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                url: "https://facebook.com",
              },
              {
                id: "tg",
                icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.19-1.82 6.98-3.02 8.38-3.61 3.98-1.67 4.81-1.96 5.35-1.97.12 0 .38.03.55.17.14.12.18.28.2.45-.02.07-.02.13-.02.19z",
                url: "https://t.me/yourusername",
              },
            ].map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20 active:scale-95"
                style={socialIconStyle}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="var(--color-white)"
                >
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h4
            className="text-xs uppercase tracking-[0.2em] font-bold mb-6"
            style={{ color: "var(--color-secondary)" }}
          >
            Quick Links
          </h4>
          <ul className="space-y-3 list-none p-0">
            <li>
              <a
                href="/home"
                className="text-sm transition-all duration-200 hover:pl-2 opacity-70 hover:opacity-100"
                style={{
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-sm transition-all duration-200 hover:pl-2 opacity-70 hover:opacity-100"
                style={{
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-sm transition-all duration-200 hover:pl-2 opacity-70 hover:opacity-100"
                style={{
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/news"
                className="text-sm transition-all duration-200 hover:pl-2 opacity-70 hover:opacity-100"
                style={{
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Latest News
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-sm transition-all duration-200 hover:pl-2 opacity-70 hover:opacity-100"
                style={{
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div className="text-sm">
          <h4
            className="text-xs uppercase tracking-[0.2em] font-bold mb-6"
            style={{ color: "var(--color-secondary)" }}
          >
            Contact Us
          </h4>

          <div className="space-y-5">
            <div className="flex items-start gap-3 group">
              <div className="mt-1 transition-transform group-hover:rotate-12">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="var(--color-secondary)"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <span
                style={{ color: "var(--color-muted)" }}
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <strong className="block mb-1" style={{ color: "var(--color-secondary)" }}>Head Office:</strong>
                No. (103), 1st Floor, 52nd Street (Middle Block),
                <br />
                (1) Ward, Pazundaung Township, Botahtaung District,
                <br />
                Yangon Region
                <br />
                <br />
                <strong className="block mb-1" style={{ color: "var(--color-secondary)" }}>Branch Office:</strong>
                Building (12), MICT Park, Agricultural College,
                <br />
                Hlaing University Campus, (12) Ward, Hlegu Township,
                <br />
                Hlaing Tharyar District, Yangon Region
              </span>
            </div>

            <div className="flex items-center gap-3 group">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="var(--color-secondary)"
                className="group-hover:scale-110 transition-transform"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <a
                href="tel:+1234567890"
                style={{ color: "var(--color-muted)" }}
                className="opacity-80 hover:opacity-100 hover:text-white transition-all"
              >
                +1 234 567 890
              </a>
            </div>

            <div className="flex items-center gap-3 group">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="var(--color-secondary)"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <a
                href="mailto:hello@lumina.com"
                style={{ color: "var(--color-muted)" }}
                className="opacity-80 hover:opacity-100 hover:text-white transition-all underline-offset-4 hover:underline"
              >
                hello@lumina.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t pt-6 text-center text-[10px] uppercase tracking-widest font-medium opacity-50"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          color: "var(--color-muted)",
        }}
      >
        © {currentYear} MCALDF. All rights reserved.
      </div>
    </footer>
  );
}
