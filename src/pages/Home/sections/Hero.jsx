import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button";

export default function Hero() {
  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (!el) return;

    // Fixed header uchun offset
    const headerOffset = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="pt-10 sm:pt-14">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 text-sm text-gray-600">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white">
              ✨
            </span>
            <span>Unlock Your Creative Potential</span>
          </div>

          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            Unlock Your Creative Potential
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            with Online Design and Development Courses.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Button as={Link} to="/courses" className="min-w-[140px]">
              Explore Courses
            </Button>

            <Button
              type="button"
              variant="outline"
              className="min-w-[120px]"
              onClick={scrollToPricing}
            >
              View Pricing
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
