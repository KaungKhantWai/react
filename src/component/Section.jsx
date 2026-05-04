export default function Section() {
  return (
    <section
      className="flex flex-col md:flex-row items-center gap-12 px-6 md:px-16 py-16 md:py-24"
      style={{ backgroundColor: "var(--color-light)" }}
    >
      {/* Left — Image */}
      <div className="w-full md:w-1/2">
        <img
          src="/section.jpg"
          alt="About us"
          className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
        />
      </div>

      {/* Right — Text */}
      <div className="w-full md:w-1/2">
        {/* Small label */}
        <span
          className="text-xs uppercase tracking-widest font-medium mb-4 block"
          style={{ color: "var(--color-secondary)" }}
        >
          About Us
        </span>

        {/* H1 — main heading */}
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-2"
          style={{
            color: "var(--color-primary)",
            fontFamily: "var(--font-heading)",
          }}
        >
          We Create Beautiful Experiences
        </h1>

        {/* H2 — sub heading */}
        <h2
          className="text-lg font-normal mb-6"
          style={{
            color: "var(--color-muted)",
            fontFamily: "var(--font-heading)",
          }}
        >
          Designers, builders & storytellers
        </h2>

        {/* Decorative line */}
        <div
          className="w-10 h-0.5 mb-6"
          style={{ backgroundColor: "var(--color-secondary)" }}
        />

        {/* Paragraphs */}
        <p
          className="text-base leading-relaxed mb-4"
          style={{
            color: "var(--color-primary)",
            fontFamily: "var(--font-body)",
          }}
        >
          This is your main paragraph. Tell visitors who you are, what you do,
          and why it matters. Keep it warm and personal — people connect with
          people, not companies.
        </p>

        <p
          className="text-base leading-relaxed"
          style={{
            color: "var(--color-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          A second paragraph if you need more space. Talk about your values,
          your approach, or your story.
        </p>
      </div>
    </section>
  );
}
