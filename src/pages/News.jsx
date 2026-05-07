import { useState } from "react";
import { Link } from "react-router-dom";

// ── Data ──
const featuredPost = {
  tag: "Breaking",
  title: "Your Most Important News Story Goes Right Here as the Headline",
  date: "May 2, 2026",
  readTime: "5 min read",
  description:
    "A short description of the featured article goes here. Keep it to two lines so the layout stays clean and readable.",
  image: "/mission.jpg",
  link: "/news/featured",
};

const trendingPosts = [
  {
    id: "1",
    title: "First trending news title goes here",
    date: "May 1, 2026",
  },
  {
    id: "2",
    title: "Second trending article title here",
    date: "Apr 30, 2026",
  },
  { id: "3", title: "Third trending story title here", date: "Apr 29, 2026" },
  { id: "4", title: "Fourth trending news title here", date: "Apr 28, 2026" },
];

const allPosts = [
  {
    id: "1",
    tag: "Category",
    title: "News Article Title One",
    date: "May 2, 2026",
    description:
      "Short description of this news article goes here to give readers a preview.",
    image: "/vision.jpg",
  },
  {
    id: "2",
    tag: "Category",
    title: "News Article Title Two",
    date: "May 1, 2026",
    description:
      "Short description of this news article goes here to give readers a preview.",
    image: "/section.jpg",
  },
  {
    id: "3",
    tag: "Category",
    title: "News Article Title Three",
    date: "Apr 30, 2026",
    description:
      "Short description of this news article goes here to give readers a preview.",
    image: "/vision.jpg",
  },
  {
    id: "4",
    tag: "Category",
    title: "News Article Title Four",
    date: "Apr 29, 2026",
    description:
      "Short description of this news article goes here to give readers a preview.",
    image: "/about.jpg",
  },
  {
    id: "5",
    tag: "Category",
    title: "News Article Title Five",
    date: "Apr 28, 2026",
    description:
      "Short description of this news article goes here to give readers a preview.",
    image: "/hero-bg.jpg",
  },
  {
    id: "6",
    tag: "Category",
    title: "News Article Title Six",
    date: "Apr 27, 2026",
    description:
      "Short description of this news article goes here to give readers a preview.",
    image: "/mission.jpg",
  },
  {
    id: "7",
    tag: "Category",
    title: "News Article Title Seven",
    date: "Apr 26, 2026",
    description:
      "Short description of this news article goes here to give readers a preview.",
    image: "/section.jpg",
  },
  {
    id: "8",
    tag: "Category",
    title: "News Article Title Eight",
    date: "Apr 25, 2026",
    description:
      "Short description of this news article goes here to give readers a preview.",
    image: "/about.jpg",
  },
  {
    id: "9",
    tag: "Category",
    title: "News Article Title Nine",
    date: "Apr 24, 2026",
    description:
      "Short description of this news article goes here to give readers a preview.",
    image: "/mission.jpg",
  },
];

const POSTS_PER_PAGE = 6;

export default function News() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
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
        Latest Updates
      </span>
      <h1
        className="text-3xl md:text-4xl font-bold mb-6"
        style={{
          color: "var(--color-primary)",
          fontFamily: "var(--font-heading)",
        }}
      >
        News & Articles
      </h1>

      {/* Search bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-10"
        style={{
          backgroundColor: "#ffffff",
          border: "0.5px solid #d0d0d0",
          maxWidth: "300px",
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="6" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={handleSearch}
          className="outline-none text-sm w-full bg-transparent"
          style={{
            color: "var(--color-primary)",
            fontFamily: "var(--font-body)",
          }}
        />
      </div>

      {/* ── Hero + Sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 mb-10">
        {/* Hero card */}
        <div
          className="relative h-[400px] md:h-[480px] rounded-2xl overflow-hidden flex items-end"
          style={{
            backgroundImage: `url('${featuredPost.image}')`,
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
              {featuredPost.tag}
            </span>
            <h2
              className="text-xl md:text-2xl font-bold leading-snug mb-2"
              style={{ color: "#ffffff", fontFamily: "var(--font-heading)" }}
            >
              {featuredPost.title}
            </h2>
            <p
              className="text-xs mb-3"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {featuredPost.date} &nbsp;·&nbsp; {featuredPost.readTime}
            </p>
            <p
              className="text-sm leading-relaxed mb-4 max-w-lg"
              style={{
                color: "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-body)",
              }}
            >
              {featuredPost.description}
            </p>
            {/* ✅ fixed — uses featuredPost.link */}
            <Link
              to={featuredPost.link}
              className="text-xs uppercase tracking-widest font-semibold hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-secondary)" }}
            >
              Read More →
            </Link>
          </div>
        </div>

        {/* Trending sidebar */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: "#ffffff" }}>
          <h3
            className="text-xs uppercase tracking-widest font-bold mb-5"
            style={{ color: "var(--color-secondary)" }}
          >
            🔥 Trending
          </h3>
          {trendingPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/news/${post.id}`}
              className="flex gap-4 py-4 border-b last:border-b-0 hover:opacity-70 transition-opacity"
              style={{ borderColor: "#f0f0f0" }}
            >
              <span
                className="text-2xl font-bold flex-shrink-0"
                style={{ color: "#eeeeee", fontFamily: "var(--font-heading)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p
                  className="text-sm font-semibold leading-snug mb-1"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {post.title}
                </p>
                <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                  {post.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── News grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {paginated.length > 0 ? (
          paginated.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
              style={{ backgroundColor: "#ffffff" }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <span
                  className="text-xs uppercase tracking-widest font-semibold block mb-2"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {post.tag}
                </span>
                <h3
                  className="text-base font-bold leading-snug mb-1"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  className="text-xs mb-3"
                  style={{ color: "var(--color-muted)" }}
                >
                  {post.date}
                </p>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{
                    color: "var(--color-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {post.description}
                </p>
                <Link
                  to={`/news/${post.id}`}
                  className="text-xs uppercase tracking-widest font-semibold hover:opacity-70 transition-opacity"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div
            className="col-span-3 text-center py-16"
            style={{
              color: "var(--color-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            No articles found for "<strong>{search}</strong>"
          </div>
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all duration-200 disabled:opacity-30"
            style={{
              border: "0.5px solid #d0d0d0",
              backgroundColor: "#ffffff",
              color: "var(--color-muted)",
            }}
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor:
                  currentPage === page ? "var(--color-secondary)" : "#ffffff",
                color:
                  currentPage === page
                    ? "var(--color-white)"
                    : "var(--color-primary)",
                border: currentPage === page ? "none" : "0.5px solid #d0d0d0",
              }}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all duration-200 disabled:opacity-30"
            style={{
              border: "0.5px solid #d0d0d0",
              backgroundColor: "#ffffff",
              color: "var(--color-muted)",
            }}
          >
            →
          </button>
        </div>
      )}
    </main>
  );
}
