import LatestNews from "../component/layout/latestNews/LatestNews";
import Hero from "../component/Hero";
import AboutUs from "../component/AboutUs";


function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <AboutUs />
      <LatestNews />
    </main>
  );
}

export default Home;
