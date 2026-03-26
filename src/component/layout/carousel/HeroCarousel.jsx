import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./HeroCarousel.css";
import { useEffect } from "react";

import slideOne from "../../../assets/images/carousel/1.jpg";
import slideTwo from "../../../assets/images/carousel/2.jpg";
import slideThree from "../../../assets/images/carousel/3.jpg";

export const heroSlides = [
  {
    id: 1,
    image: slideOne,
    alt: "Community legal support session",
    title: "Justice Within Reach",
    description:
      "We provide accessible legal aid and trusted guidance for communities across Myanmar.",
    // cta: {
    //   label: "Explore Programs",
    //   href: "#programs",
    // },
  },
  {
    id: 2,
    image: slideTwo,
    alt: "Team collaboration in a modern office",
    title: "Built on Collaboration",
    description:
      "Partnering with local leaders to protect rights, expand access, and build resilience.",
    // cta: {
    //   label: "See Our Impact",
    //   href: "#impact",
    // },
  },
  {
    id: 3,
    image: slideThree,
    alt: "Training and outreach workshop",
    title: "Education & Outreach",
    description:
      "Training programs that empower citizens with legal knowledge and practical support.",
    // cta: {
    //   label: "Join the Training",
    //   href: "#training",
    // },
  },
];

function HeroCarousel({ slides = heroSlides }) {
  useEffect(() => {
    // Use setTimeout to ensure Swiper has rendered
    const timer = setTimeout(() => {
      const wrapper = document.querySelector('.hero-carousel .swiper-wrapper');
      const image = document.querySelector('.hero-carousel img');
      
      console.log('=== Height Debug Info ===');
      console.log('Wrapper height:', wrapper?.clientHeight, 'px');
      console.log('Image height:', image?.clientHeight, 'px');
      console.log('Wrapper computed style:', wrapper && getComputedStyle(wrapper).height);
      console.log('Section height:', document.querySelector('.hero-carousel')?.clientHeight, 'px');
      console.log('========================');
    }, 1000); // Wait 1 second for Swiper to initialize

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array = run once on mount

  return (
    <section className="hero-carousel relative w-full" aria-label="Hero">
      <style>{`
        .hero-carousel .swiper-wrapper {
          height: 100% !important;
        }
      `}</style>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        speed={750}
        slidesPerView={1}
        className="w-full h-[35vh] w-full md:h-[45vh]" 
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.alt}
                className="h-100px w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-900/60" />
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroCarousel;
