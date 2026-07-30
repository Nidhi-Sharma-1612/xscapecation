import About from "@/components/About";
import Amenities from "@/components/Amenities";
import CTA from "@/components/CTA";
import Explore from "@/components/Explore";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
      <Properties />
      <Amenities />
      <Reviews />
      <Explore />
      <CTA />
      <Footer />
    </main>
  );
}
