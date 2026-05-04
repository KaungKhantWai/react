import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const posts = [
  {
    id: "1", // ✅ fixed — string with closing quote
    tag: "Category",
    title: "News Article Title One",
    date: "May 2, 2026",
    readTime: "5 min read",
    image: "/news-1.jpg",
    author: {
      name: "John Doe",
      initials: "JD",
      avatar: "", // ← put "/author-1.jpg" here or leave empty for initials
    },
    body: [
      {
        type: "paragraph",
        text: "This is your opening paragraph. Start strong — tell the reader what this article is about and why it matters.",
      },
      {
        type: "paragraph",
        text: "This is the second paragraph. Continue the story here with more detail and context.",
      },
      { type: "heading", text: "A Section Heading" },
      {
        type: "paragraph",
        text: "After a heading you can start a new part of the story. Use headings to break up long articles.",
      },
      {
        type: "quote",
        text: "A powerful quote from the article or a key person can go here to break up the text visually.",
      },
      {
        type: "paragraph",
        text: "Final paragraph wrapping up the article. Give the reader a clear takeaway or call to action.",
      },
    ],
  },
  {
    id: "2",
    tag: "Category",
    title: "News Article Title Two",
    date: "May 1, 2026",
    readTime: "4 min read",
    image: "/news-2.jpg",
    author: { name: "Jane Smith", initials: "JS", avatar: "" },
    body: [
      { type: "paragraph", text: "Opening paragraph for article two." },
      { type: "heading", text: "Section Heading" },
      { type: "paragraph", text: "More content for article two goes here." },
      { type: "quote", text: "An inspiring quote for article two." },
      { type: "paragraph", text: "Closing paragraph for article two." },
    ],
  },
  {
    id: "3",
    tag: "Category",
    title: "News Article Title Three",
    date: "Apr 30, 2026",
    readTime: "3 min read",
    image: "/news-3.jpg",
    author: { name: "Bob Lee", initials: "BL", avatar: "" },
    body: [
      { type: "paragraph", text: "Opening paragraph for article three." },
      { type: "heading", text: "Section Heading" },
      { type: "paragraph", text: "More content for article three goes here." },
      { type: "quote", text: "An inspiring quote for article three." },
      { type: "paragraph", text: "Closing paragraph for article three." },
    ],
  },
];

export default function NewsDetail() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

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
          {post.tag}
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
          {post.author.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-white)",
              }}
            >
              {post.author.initials}
            </div>
          )}
          <div>
            <p
              className="text-sm font-semibold"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-body)",
              }}
            >
              {post.author.name}
            </p>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              {post.date} &nbsp;·&nbsp; {post.readTime}
            </p>
          </div>
        </div>

        {/* Hero photo */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[300px] md:h-[420px] object-cover rounded-2xl mb-10"
        />

        {/* Article body */}
        <div className="flex flex-col gap-5">
          {post.body.map((block, index) => {
            if (block.type === "paragraph")
              return (
                <p
                  key={index}
                  className="text-base leading-loose"
                  style={{ color: "#333333", fontFamily: "var(--font-body)" }}
                >
                  {block.text}
                </p>
              );

            if (block.type === "heading")
              return (
                <h2
                  key={index}
                  className="text-xl md:text-2xl font-bold mt-4"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {block.text}
                </h2>
              );

            if (block.type === "quote")
              return (
                <blockquote
                  key={index}
                  className="pl-4 my-2"
                  style={{ borderLeft: "2px solid var(--color-secondary)" }}
                >
                  <p
                    className="text-lg italic leading-relaxed"
                    style={{
                      color: "var(--color-primary)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    "{block.text}"
                  </p>
                </blockquote>
              );

            return null;
          })}
        </div>
      </article>
    </main>
  );
}
