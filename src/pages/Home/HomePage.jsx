import Navbar from "../../components/layout/Navbar";
import Hero from "./sections/Hero";
import PartnersRow from "./sections/PartnersRow";
import VideoShowcase from "./sections/VideoShowcase";
import Benefits from "./sections/Benefits";
import Courses from "./sections/Courses";
import Testimonials from "./sections/Testimonials";
import Pricing from "./sections/Pricing";
import FAQ from "./sections/FAQ";
import Footer from "../../components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main>
        <Hero />
        <PartnersRow />
        <VideoShowcase />
        <Benefits />
        <Courses />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
    </div>
  );
}
