import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../card/Card";

const demoNews = [
  {
    id: 1,
    title: "Mountain Sunrise Tour",
    description:
      "Catch the first light from the ridgeline with a guided dawn hike and warm drinks.",
    imageSrc:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Sunrise over mountains",
    href: "/news/mountain-sunrise",
  },
  {
    id: 2,
    title: "Forest Wellness Retreat",
    description:
      "Reset your week with mindful walks, quiet cabins, and a wellness-focused itinerary.",
    imageSrc:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Forest trail",
    href: "/news/forest-retreat",
  },
  {
    id: 3,
    title: "Coastal Kayak Getaway",
    description:
      "Glide along calm waters and explore hidden coves with our weekend kayak package.",
    imageSrc:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Ocean waves",
    href: "/news/coastal-kayak",
  },
  {
    id: 4,
    title: "Cabin Comforts Update",
    description:
      "New interiors, upgraded fireplaces, and faster check-in for a smoother stay.",
    imageSrc:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Lakeside cabin",
    href: "/news/cabin-update",
  },
  {
    id: 5,
    title: "Starwatching Weekends",
    description:
      "Join our astronomy nights featuring guided sky tours and cozy blankets.",
    imageSrc:
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Night sky with stars",
    href: "/news/starwatching",
  },
  {
    id: 6,
    title: "Trail Guides Expanded",
    description:
      "More curated routes added for all skill levels, with new safety checkpoints.",
    imageSrc:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Mountain trail",
    href: "/news/trail-guides",
  },
];

const GAP_PX = 24;

const getVisibleCount = () => {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
};

function LatestNews({ items = demoNews, title = "Latest News", linkTo = "/news" }) {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const containerRef = useRef(null);

  const total = items.length;
  const maxIndex = Math.max(0, total - visibleCount);
  const canSlide = total > visibleCount;

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateSlideWidth = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const nextWidth =
        (containerWidth - GAP_PX * (visibleCount - 1)) / visibleCount;
      setSlideWidth(nextWidth);
    };

    updateSlideWidth();
    window.addEventListener("resize", updateSlideWidth);
    return () => window.removeEventListener("resize", updateSlideWidth);
  }, [visibleCount]);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (!canSlide || isPaused) return;
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(intervalId);
  }, [canSlide, isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h2>
          <Link
            to={linkTo}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
          >
            <span>See More</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H3a1 1 0 110-2h12.586l-3.293-3.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div ref={containerRef} className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (slideWidth + GAP_PX)}px)`,
              }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex shrink-0 justify-center"
                  style={{ width: slideWidth ? `${slideWidth}px` : "100%" }}
                >
                  <div className="h-full transition-transform duration-300 ease-out hover:scale-[1.02]">
                    <Card
                      imageSrc={item.imageSrc}
                      imageAlt={item.imageAlt}
                      title={item.title}
                      description={item.description}
                      href={item.href}
                      linkText="Read More"
                      className="h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {canSlide && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous news"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/50 bg-white/70 p-2 text-slate-700 shadow-md backdrop-blur transition hover:scale-105 hover:text-slate-900 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:text-white"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 3.293a1 1 0 010 1.414L8.414 9H18a1 1 0 110 2H8.414l4.293 4.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next news"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/50 bg-white/70 p-2 text-slate-700 shadow-md backdrop-blur transition hover:scale-105 hover:text-slate-900 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:text-white"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 16.707a1 1 0 010-1.414L11.586 11H2a1 1 0 110-2h9.586L7.293 4.707a1 1 0 111.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default LatestNews;
