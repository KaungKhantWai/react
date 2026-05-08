import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../card/Card";

const API = "http://localhost:5000";

function LatestNews({ title = "Latest News", linkTo = "/news" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API}/api/posts`);
        const json = await res.json();

        if (json.success) {
          // နောက်ဆုံးတင်တဲ့ Date အလိုက် Sort လုပ်ပြီး ၃ ခုပဲ ယူမယ်
          const latestItems = json.data
            .sort((a, b) => new Date(b.datetime || b.createdAt) - new Date(a.datetime || a.createdAt))
            .slice(0, 3);

          setItems(
            latestItems.map((post) => ({
              id: post.id,
              title: post.title,
              category: post.category,
              date: post.datetime
                ? new Date(post.datetime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
              imageSrc: `${API}/uploads/${post.image}`,
              imageAlt: post.title,
              href: `/posts/${post.id}`,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-4 text-center">
          <p className="text-slate-500 animate-pulse">Loading latest news...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Header: Title & See More */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {title}
          </h2>
          <Link
            to={linkTo}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <span>See More</span>
            <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H3a1 1 0 110-2h12.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {/* ⭐ Grid Layout: ၃ ခုကို ဘေးတိုက်ပြမယ် */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-center">
              <Card
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                title={item.title}
                description={`${item.category} · ${item.date}`}
                href={item.href} // /posts/:id ဆီကိုသွားမယ်
                linkText="Read More"
                className="h-full shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestNews;