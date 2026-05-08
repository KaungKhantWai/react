import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ── Data ──
const API_BASE_URL = "http://localhost:5000";
const SEARCH_ALIASES = {
  technology: "tech",
};

const fallbackFeaturedPost = {
  tag: "Latest",
  title: "Latest news will appear here",
  date: "Latest update",
  readTime: "1 min read",
  description: "Check back soon for the newest article from MCALDF.",
  image: "/mission.jpg",
  link: "/news",
};

const formatPostDate = (post) => {
  const dateValue = post.datetime || post.createdAt;

  if (!dateValue) {
    return "Latest update";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Latest update";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getPostImageSrc = (image) => {
  if (!image) {
    return fallbackFeaturedPost.image;
  }

  const imageSrc = String(image);

  if (imageSrc.startsWith("http") || imageSrc.startsWith("/")) {
    return imageSrc;
  }

  return `${API_BASE_URL}/uploads/${imageSrc}`;
};

const getPostContent = (post) =>
  post.paragraph || post.content || post.description || "";

const getPostExcerpt = (post) => {
  const content = getPostContent(post).replace(/\s+/g, " ").trim();

  if (!content) {
    return "Read the latest update from MCALDF.";
  }

  return content.length > 150 ? `${content.slice(0, 147)}...` : content;
};

const estimateReadTime = (post) => {
  const words = getPostContent(post).trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
};

const mapPostToFeaturedPost = (post) => ({
  tag: post.category || "Latest",
  title: post.title || "Untitled news",
  date: formatPostDate(post),
  readTime: estimateReadTime(post),
  description: getPostExcerpt(post),
  image: getPostImageSrc(post.image),
  link: post.id ? `/posts/${post.id}` : fallbackFeaturedPost.link,
});

const mapPostToTrendingPost = (post, index) => ({
  id: post.id || `latest-${index}`,
  title: post.title || "Untitled news",
  date: formatPostDate(post),
  image: getPostImageSrc(post.image),
  link: post.id ? `/posts/${post.id}` : "/news",
});

const mapPostToGridPost = (post, index) => ({
  id: post.id || `post-${index}`,
  tag: post.category || "Latest",
  title: post.title || "Untitled news",
  date: formatPostDate(post),
  description: getPostExcerpt(post),
  image: getPostImageSrc(post.image),
  link: post.id ? `/posts/${post.id}` : "/news",
});

const getApiSearchTerm = (value) => {
  const searchTerm = value.trim();
  const alias = SEARCH_ALIASES[searchTerm.toLowerCase()];

  return alias || searchTerm;
};

const POSTS_PER_PAGE = 6;

export default function News() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [featuredPost, setFeaturedPost] = useState(fallbackFeaturedPost);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [newsPosts, setNewsPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fetchNewsPosts = async () => {
      try {
        setIsLoadingPosts(true);

        const searchTerm = getApiSearchTerm(search);
        const query = searchTerm
          ? `?search=${encodeURIComponent(searchTerm)}`
          : "";
        const res = await fetch(`${API_BASE_URL}/api/posts${query}`);
        const contentType = res.headers.get("content-type");
        const json = contentType?.includes("application/json")
          ? await res.json()
          : null;
        const posts = Array.isArray(json?.data) ? json.data : [];

        if (res.ok && isActive) {
          setNewsPosts(posts.map(mapPostToGridPost));
          setTrendingPosts(posts.slice(0, 4).map(mapPostToTrendingPost));
          setFeaturedPost(
            posts.length > 0
              ? mapPostToFeaturedPost(posts[0])
              : fallbackFeaturedPost,
          );
        }
      } catch (err) {
        console.error("Failed to fetch news posts:", err);
      } finally {
        if (isActive) {
          setIsLoadingPosts(false);
        }
      }
    };

    fetchNewsPosts();

    return () => {
      isActive = false;
    };
  }, [search]);

  const filtered = newsPosts;

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

            {/* uses featuredPost.link */}
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
          {trendingPosts.map((post) => (
            <Link
              key={post.id}
              to={post.link}
              className="flex items-start gap-4 py-4 border-b last:border-b-0 hover:opacity-70 transition-opacity"
              style={{ borderColor: "#f0f0f0" }}
            >
            
              <img
                src={post.image}
                alt={post.title}
                className="h-16 w-20 flex-shrink-0 rounded-lg object-cover"
                style={{
                  width: "80px",
                  height: "64px",
                  backgroundColor: "#f3f4f6",
                }}
                onError={(event) => {
                  event.currentTarget.src = fallbackFeaturedPost.image;
                }}
              />
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
        {isLoadingPosts ? (
          <div
            className="col-span-3 text-center py-16"
            style={{
              color: "var(--color-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Loading articles...
          </div>
        ) : paginated.length > 0 ? (
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
                onError={(event) => {
                  event.currentTarget.src = fallbackFeaturedPost.image;
                }}
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
                  to={post.link}
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
