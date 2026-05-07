import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Section() {
    const [breakingPost, setBreakingPost] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then(res => res.json())
      .then(data => setBreakingPost(data.data[0]))
      .catch(err => console.error(err));
  }, []);

  if (!breakingPost) return null;

  return (
    <section
      className="flex justify-center items-center gap-12 px-6 md:px-16 py-16 md:py-24"
      style={{ backgroundColor: "var(--color-light)" }}
    >
      <div
          className="relative w-full max-w-6xl h-[400px] md:h-[550px] rounded-2xl overflow-hidden flex items-end"
          style={{
            backgroundImage: `url('http://localhost:5000/uploads/${breakingPost.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
            }}
          />

          <div className="relative p-6 md:p-8">
            <span
              className="inline-block text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded mb-3"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-white)",
              }}
            >
              {breakingPost.category}
            </span>
            <h2
              className="text-xl md:text-2xl font-bold leading-snug mb-2"
              style={{ color: "#ffffff", fontFamily: "var(--font-heading)" }}
            >
              {breakingPost.title}
            </h2>
            <p
              className="text-xs mb-3"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {breakingPost.date} &nbsp;·&nbsp; {breakingPost.readTime}
            </p>
            <p
              className="text-sm leading-relaxed mb-4 max-w-lg"
              style={{
                color: "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-body)",
              }}
            >
              {breakingPost.author}
            </p>

            <p
            className="text-xs mb-3"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {new Date(breakingPost.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

            {/* ✅ fixed — uses featuredPost.link */}
            <Link
              to={`/posts/${breakingPost.id}`}
              className="text-xs uppercase tracking-widest font-semibold hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-secondary)" }}
            >
              Read More →
            </Link>
          </div>
        </div>

    </section>
  );
}
