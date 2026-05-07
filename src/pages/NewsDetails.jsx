import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export default function NewsDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then(res => res.json())
      .then(data => { setPost(data); setLoading(false); }) 
    .catch(err => { console.error(err); setLoading(false); });
}, [id]);

  if (loading) return <p>Loading...</p>;

  if (!post) {
    return (
      <main
        className="flex flex-col items-center justify-center min-h-screen"
        style={{ backgroundColor: "var(--color-light)" }}
      >
        <h1
          className="text-2xl font-bold mb-4"
          style={{
            color: "var(--color-primary)",
            fontFamily: "var(--font-heading)",
          }}
        >
          Article not found
        </h1>
        <Link
          to="/news"
          className="text-sm hover:opacity-70 transition-opacity"
          style={{ color: "var(--color-secondary)" }}
        >
          ← Back to News
        </Link>
      </main>
    );
  }

  return (
    <main
      className="px-6 py-16 md:py-24"
      style={{ backgroundColor: "var(--color-light)" }}
    >
      <article className="max-w-2xl mx-auto">
        {/* Back button */}
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-xs mb-8 hover:opacity-70 transition-opacity"
          style={{
            color: "var(--color-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          ← Back to News
        </Link>

        {/* Category tag */}
        <span
          className="inline-block text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded mb-4 ml-3"
          style={{
            backgroundColor: "var(--color-secondary)",
            color: "var(--color-white)",
          }}
        >
          {post.category}
        </span>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-6"
          style={{
            color: "var(--color-primary)",
            fontFamily: "var(--font-heading)",
          }}
        >
          {post.title}
        </h1>

        {/* Author row */}
        <div
          className="flex items-center gap-3 mb-8 pb-8"
          style={{ borderBottom: "0.5px solid #dddddd" }}
        >
          <div>
            <p
              className="text-sm font-semibold"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-body)",
              }}
            >
              {post.author}
            </p>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
} )}
            </p>
          </div>
        </div>

        {/* Hero photo */}
        {post.image && (<img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt={post.title}
          className="w-full h-[300px] md:h-[420px] object-cover rounded-2xl mb-10"
        />)}

        {/* Article body */}
        <div className="flex flex-col gap-5">
          <p>
            {post.paragraph}
          </p>
        </div>
      </article>
    </main>
  );
}
