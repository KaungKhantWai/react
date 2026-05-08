import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000";

export default function NewsDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/posts/${id}`);
        const contentType = res.headers.get("content-type");
        const json = contentType?.includes("application/json")
          ? await res.json()
          : null;

        const postData = json?.data || json;

        if (res.ok && postData?.id) {
          setPost(postData);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load post content");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
    // ID ပြောင်းသွားတိုင်း data အသစ်ပြန်ဆွဲမယ်
    window.scrollTo(0, 0); 
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-slate-500">Loading article...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <h1 className="text-2xl font-bold mb-4 text-slate-800">Article not found</h1>
        <Link to="/news" className=" hover:underline" style={{ color: "var(--color-secondary)" }}>
          ← Back to News
        </Link>
      </main>
    );
  }

  return (
    <main className="px-6 py-12 md:py-20 bg-slate-50 min-h-screen">
      <article className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-sm">
        {/* Navigation */}
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-sm mb-8 text-slate-500 hover:text-slate-800 transition-colors"
        >
          ← Back to News
        </Link>

        {/* Category */}
        <div className="mb-4">
          <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded  " style={{ color: "var(--color-secondary)" }}>
            {post.category || "General"}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 text-slate-900">
          {post.title}
        </h1>

        {/* Author & Date */}
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
            {post.author?.charAt(0) || "A"}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{post.author || "Admin"}</p>
            <p className="text-xs text-slate-500">
              {new Date(post.datetime || post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Hero Image */}
        {post.image && (
          <figure className="mb-10">
            <img
              src={`${API_BASE_URL}/uploads/${post.image}`}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg"
            />
          </figure>
        )}

        {/* Article Body */}
        <div className="prose prose-slate max-w-none">
          <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-line">
            {post.paragraph || post.content}
          </p>
        </div>
      </article>
    </main>
  );
}
