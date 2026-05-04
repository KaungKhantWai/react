import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // connect to your backend or email service here later
  };

  return (
    <main
      className="px-6 md:px-16 py-16 md:py-24"
      style={{ backgroundColor: "var(--color-light)" }}
    >
      {/* Header */}
      <span
        className="text-xs uppercase tracking-widest font-semibold block mb-2"
        style={{ color: "var(--color-secondary)" }}
      >
        Get In Touch
      </span>
      <h1
        className="text-3xl md:text-4xl font-bold mb-2"
        style={{
          color: "var(--color-primary)",
          fontFamily: "var(--font-heading)",
        }}
      >
        Contact Us
      </h1>
      <p
        className="text-sm md:text-base mb-6 max-w-lg"
        style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}
      >
        Have a question or want to work together? Fill out the form and we'll
        get back to you shortly.
      </p>
      <div
        className="w-10 h-0.5 mb-12"
        style={{ backgroundColor: "var(--color-secondary)" }}
      />

      {/* Grid — stacks on mobile, side by side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20 items-start">
        {/* Left — Contact Info */}
        <div className="flex flex-col gap-6">
          {/* Address */}
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(233,69,96,0.1)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="var(--color-secondary)"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Address
              </p>
              <p
                className="text-sm font-medium leading-relaxed"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                123 Your Street,
                <br />
                City, Country
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(233,69,96,0.1)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="var(--color-secondary)"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Phone
              </p>
              <a
                href="tel:+1234567890"
                className="text-sm font-medium hover:opacity-70 transition-opacity"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                +1 234 567 890
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(233,69,96,0.1)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="var(--color-secondary)"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Email
              </p>
              <a
                href="mailto:hello@lumina.com"
                className="text-sm font-medium hover:opacity-70 transition-opacity"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                hello@lumina.com
              </a>
            </div>
          </div>
        </div>

        {/* Right — Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--color-muted)" }}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 focus:border-[var(--color-secondary)]"
                style={{
                  border: "0.5px solid #d0d0d0",
                  fontFamily: "var(--font-body)",
                  color: "var(--color-primary)",
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--color-muted)" }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 focus:border-[var(--color-secondary)]"
                style={{
                  border: "0.5px solid #d0d0d0",
                  fontFamily: "var(--font-body)",
                  color: "var(--color-primary)",
                }}
              />
            </div>
          </div>

          {/* Phone + Subject row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--color-muted)" }}
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone"
                className="px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 focus:border-[var(--color-secondary)]"
                style={{
                  border: "0.5px solid #d0d0d0",
                  fontFamily: "var(--font-body)",
                  color: "var(--color-primary)",
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--color-muted)" }}
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 focus:border-[var(--color-secondary)]"
                style={{
                  border: "0.5px solid #d0d0d0",
                  fontFamily: "var(--font-body)",
                  color: "var(--color-primary)",
                }}
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--color-muted)" }}
            >
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows={5}
              required
              className="px-4 py-2.5 rounded-lg text-sm outline-none resize-none transition-all duration-200 focus:border-[var(--color-secondary)]"
              style={{
                border: "0.5px solid #d0d0d0",
                fontFamily: "var(--font-body)",
                color: "var(--color-primary)",
              }}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-fit px-8 py-4 rounded-lg text-sm font-semibold tracking-widest uppercase transition-opacity duration-200 hover:opacity-80"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-white)",
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
