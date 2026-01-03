import { Link, useLocation, useNavigate } from "react-router-dom";
import { Send, Instagram, Bot } from "lucide-react";
import Container from "../ui/Container";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToPricingSection = (e) => {
    e.preventDefault();

    // agar Home'da bo'lsak shu yerning o'zida scroll
    if (location.pathname === "/") {
      const el = document.getElementById("pricing");
      if (!el) return;
      const headerOffset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }

    // boshqa page'dan bosilsa: Home'ga o'tib keyin pricingga tushadi
    navigate("/#pricing");
  };

  return (
    <footer className="border-t border-gray-100 bg-white">
      <Container className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500 text-white font-bold">
                U
              </span>
              <span className="font-semibold text-gray-900">UzStudents</span>
            </Link>

            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <div>+998 88 205 85 08</div>
              <div>uzstudents.official@gmail.com</div>
              <div>Surkhandarya, Uzbekistan</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">Menu</div>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <Link to="/" className="block hover:text-gray-900">
                Home
              </Link>
              <Link to="/courses" className="block hover:text-gray-900">
                Courses
              </Link>

              {/* Pricing - shu Home'dagi section */}
              <a
                href="/#pricing"
                onClick={goToPricingSection}
                className="block hover:text-gray-900"
              >
                Pricing
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">About Us</div>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <Link to="/about" className="block hover:text-gray-900">
                About
              </Link>
              <Link to="/contact" className="block hover:text-gray-900">
                Contact
              </Link>
              <Link to="/faq" className="block hover:text-gray-900">
                FAQ
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">
              Useful Pages
            </div>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <Link to="/terms" className="block hover:text-gray-900">
                Terms
              </Link>
              <Link to="/privacy" className="block hover:text-gray-900">
                Privacy
              </Link>
              <Link to="/support" className="block hover:text-gray-900">
                Support
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} UzStudents. All rights reserved.
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://t.me/uzstudents_official"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              title="Telegram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700"
            >
              <Send size={18} />
            </a>

            <a
              href="https://www.instagram.com/uzstudents.official/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://t.me/uzstudents_official_bot"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram Bot"
              title="Telegram Bot"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700"
            >
              <Bot size={18} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
