function Card({
  imageSrc = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
  imageAlt = "Card image",
  title = "Into the Mountains",
  description = "Discover quiet trails, crisp air, and unforgettable views in the heart of the range.",
  href = "#",
  linkText = "Read More",
  className = "",
}) {
  return (
    <div className={`w-full max-w-sm ${className}`.trim()}>
      <article className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800/60">
        <div className="h-48 w-full overflow-hidden rounded-t-xl">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-3 p-5">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {description}
          </p>
          <a
            href={href}
            className="group mt-auto inline-flex items-center gap-2 self-start rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:hover:bg-white dark:hover:text-slate-900"
          >
            {linkText}
            <span className="text-xs transition-transform group-hover:translate-x-0.5">
              &gt;
            </span>
          </a>
        </div>
      </article>
    </div>
  );
}

export default Card;
