import HeroCarousel from "../component/layout/carousel/HeroCarousel";
import AboutUs from "../component/layout/aboutUs/AboutUs";
import LatestNews from "../component/layout/latestNews/LatestNews";
import Footer from "../component/layout/footer/Footer";


function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroCarousel />
      <AboutUs />
      <LatestNews />
    </main>
  );
}

export default Home;
