import LatestNews from "../component/layout/latestNews/LatestNews";
import Hero from "../component/Hero";
import AboutUs from "../component/AboutUs";
import Section from "../component/Section";

function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <AboutUs />
      <Section />
      <LatestNews />
    </main>
  );
}

export default Home;
