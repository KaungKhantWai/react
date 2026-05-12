import { Link } from "react-router-dom";

export default function About() {
  return (
    <section
      className="flex flex-col md:flex-row items-center gap-12 px-6 md:px-16 py-16 md:py-24"
      style={{ backgroundColor: "var(--color-light)" }}
    >
      {/* Left — Image */}
      <div className="w-full md:w-1/2">
        <img
          src="/about.jpg"
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
          About MCALDF
        </h1>

        {/* H2 — sub heading */}
        <h2
          className="text-lg font-normal mb-6"
          style={{
            color: "var(--color-muted)",
            fontFamily: "var(--font-heading)",
          }}
        >
          Empowering Myanmar's Agricultural Future
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
          Myanmar is an agricultural-based country where 70 percent of the
          population depends on agriculture and livestock. MCALDF works in
          collaboration with government ministries to protect farmers' livelihoods,
          establish quality monitoring systems, and promote private sector
          participation in the agricultural sector.
        </p>

        <p
          className="text-base leading-relaxed mb-4"
          style={{
            color: "var(--color-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          We bring Chinese agricultural experts for training, conduct workshops at
          agricultural schools and universities, provide resources like seeds and
          equipment, and connect agricultural associations and entrepreneurs across
          both nations.
        </p>

        <Link to="/about" className="text-xs uppercase tracking-widest font-semibold hover:opacity-70 transition-opacity"
                  style={{ color: "var(--color-secondary)" }}>Read More →</Link>

      </div>
    </section>
  );
}
