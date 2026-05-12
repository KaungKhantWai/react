const objectives = [
  {
    title: "Farmer Livelihood Protection",
    text: "Develop and implement strategies compatible with current economic policies to protect farmers' livelihoods and manage resources effectively.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="var(--color-secondary)"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Quality & Safety Standards",
    text: "Establish monitoring systems to ensure the quality and safety of agricultural products in line with international standards.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-secondary)"
        strokeWidth="2"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Private Sector Growth",
    text: "Develop policies to encourage and promote private sector participation in the agricultural sector and improve the business environment.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="var(--color-secondary)"
      >
        <path d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
      </svg>
    ),
  },
  {
    title: "Expert Training & Scholarships",
    text: "Invite agricultural experts from China to provide practical training on technology and management to farmers with MCALDF scholarships.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-secondary)"
        strokeWidth="2"
      >
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
      </svg>
    ),
  },
  {
    title: "Education & Technology Transfer",
    text: "Conduct workshops, share technology and conduct educational cooperation in agriculture-based secondary schools and agricultural universities.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="var(--color-secondary)"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Resource & Network Connection",
    text: "Provide seeds, inputs and equipment, and connect agricultural associations, foundations and entrepreneurs in China.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-secondary)"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <main>
      {/* Who We Are Section */}
      <section
        className="px-6 md:px-16 py-16 md:py-24"
        style={{ backgroundColor: "var(--color-light)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24 items-start">
          {/* Left — labels stay sticky while right scrolls */}
          <div className="md:sticky md:top-24">
            <span
              className="text-xs uppercase tracking-widest font-semibold block mb-3"
              style={{ color: "var(--color-secondary)" }}
            >
              About Mcaldf
            </span>

            <h1
              className="text-3xl md:text-4xl font-bold leading-tight mb-4"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Who We Are
            </h1>

            <div
              className="w-10 h-0.5"
              style={{ backgroundColor: "var(--color-secondary)" }}
            />
          </div>

          {/* Right — paragraphs, handles long content naturally */}
          <div>
            <p
              className="text-base leading-loose mb-6"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-body)",
              }}
            >
              The Myanmar-China Agricultural & Livestock Development Foundation
              (MCALDF) stands for Myanmar, China, Agricultural, Livestock,
              Development, and Foundation. Our logo symbolizes this partnership —
              the green leaf represents the development of agricultural production
              throughout Myanmar, the red hand represents the support of the
              Agricultural Producers Association in China, and the three colors of
              green, yellow, and red represent our commitment to prioritizing the
              interests of citizens.
            </p>

            <blockquote
              className="pl-4 my-8"
              style={{ borderLeft: "2px solid var(--color-secondary)" }}
            >
              <p
                className="text-lg italic leading-relaxed"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                "To promote economic development with the support of China and to
                sustain the long-term friendship between the two countries through
                economic development."
              </p>
            </blockquote>

            <p
              className="text-base leading-loose mb-6"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-body)",
              }}
            >
              Myanmar is an agricultural-based country where 70 percent of the
              population depends on agriculture and livestock for their livelihoods,
              which are vulnerable to climate change. In collaboration with the
              Ministry of Agriculture, Livestock and Irrigation and the Ministry of
              Planning, Finance and Economy and Investment, we work to protect
              farmers' livelihoods, ensure product quality, and promote private
              sector participation.
            </p>

            <p
              className="text-base leading-loose"
              style={{
                color: "var(--color-muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              Our activities include inviting Chinese agricultural experts for
              practical training, conducting workshops at agricultural schools and
              universities, providing resources such as seeds and equipment, and
              connecting agricultural associations and entrepreneurs across both
              nations.
            </p>
          </div>
        </div>
      </section>

      <section
        className="px-6 md:px-16 py-16 md:py-24"
        style={{ backgroundColor: "var(--color-light)" }}
      >
        {/* Section header */}
        <span
          className="text-xs uppercase tracking-widest font-semibold block mb-2"
          style={{ color: "var(--color-secondary)" }}
        >
          What Drives Us
        </span>
        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{
            color: "var(--color-primary)",
            fontFamily: "var(--font-heading)",
          }}
        >
          Mission & Vision
        </h2>

        {/* Overlapping cards */}
        <div className="relative flex flex-col">
          {/* Mission card — sits on top */}
          <div
            className="relative h-[320px] md:h-[400px] rounded-2xl overflow-hidden z-10 -mb-16"
            style={{
              backgroundImage: "url('/mission.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
            />

            {/* Content sits at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <span
                className="text-xs uppercase tracking-widest font-semibold block mb-2"
                style={{ color: "var(--color-secondary)" }}
              >
                Our Mission
              </span>
              <h3
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: "#ffffff", fontFamily: "var(--font-heading)" }}
              >
                Empowering Myanmar's Agricultural Future
              </h3>
              <p
                className="text-sm md:text-base leading-relaxed max-w-xl"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "var(--font-body)",
                }}
              >
                To protect farmers' livelihoods and manage resources effectively
                through strategies compatible with current economic policies.
                Establish quality monitoring systems for agricultural products
                and promote private sector participation to improve the business
                environment.
              </p>
            </div>
          </div>

          {/* Vision card — sits behind, peeking below */}
          <div
            className="relative h-[320px] md:h-[400px] rounded-2xl overflow-hidden z-0"
            style={{
              backgroundImage: "url('/vision.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
            />

            {/* Content pushed down so it peeks below mission card */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <span
                className="text-xs uppercase tracking-widest font-semibold block mb-2"
                style={{ color: "var(--color-secondary)" }}
              >
                Our Vision
              </span>
              <h3
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: "#ffffff", fontFamily: "var(--font-heading)" }}
              >
                Sustaining Myanmar-China Friendship
              </h3>
              <p
                className="text-sm md:text-base leading-relaxed max-w-xl"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "var(--font-body)",
                }}
              >
                To sustain the long-term friendship between Myanmar and China
                through economic development. Build lasting cooperation in
                agriculture, education, and technology transfer that benefits
                communities across both nations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-6 md:px-16 py-16 md:py-24"
        style={{ backgroundColor: "var(--color-white)" }}
      >
        {/* Header */}
        <span
          className="text-xs uppercase tracking-widest font-semibold block mb-2"
          style={{ color: "var(--color-secondary)" }}
        >
          Our Objectives
        </span>
        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{
            color: "var(--color-black)",
            fontFamily: "var(--font-heading)",
          }}
        >
          What We Aim to Achieve
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj) => (
            <div
              key={obj.title}
              className="group rounded-2xl p-6 transition-all duration-300 cursor-pointer border border-transparent hover:-translate-y-2"
              style={{
                background: "var(--color-light)",
                boxShadow: "0 4px 20px -10px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-secondary)";
                e.currentTarget.style.boxShadow =
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px -10px rgba(0,0,0,0.1)";
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:scale-110"
                style={{ backgroundColor: "rgba(233,69,96,0.15)" }}
              >
                <span className="transition-transform duration-300 group-hover:rotate-12">
                  {obj.icon}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-base font-semibold mb-2 transition-colors duration-300 group-hover:text-[var(--color-secondary)]"
                style={{
                  color: "var(--color-black)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {obj.title}
              </h3>

              {/* Text */}
              <p
                className="text-sm leading-relaxed transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-body)",
                  opacity: 0.8,
                }}
              >
                {obj.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
