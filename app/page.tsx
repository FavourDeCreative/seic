import Hero from "@/components/Hero";
import About from "@/components/About";
import Ministries from "@/components/Ministries";
import Gallery from "@/components/Gallery";
import Sermons from "@/components/Sermons";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      {/* Hero already fills the viewport, so it doubles as the "home" anchor target. */}
        <Hero />

        <About />

        <Ministries />

        <Gallery />

        <Sermons />
      
        <Contact />

    </>
  );
}
