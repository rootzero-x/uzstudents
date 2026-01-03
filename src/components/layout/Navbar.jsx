import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { navLinks } from "../../pages/Home/data/homeData";
import { useAuth } from "../../context/AuthContext";

function Hamburger({ open }) {
  // 3 tayoqcha -> X animatsiya
  return (
    <div className="relative h-4 w-6">
      <span
        className={[
          "absolute left-0 top-0 block h-0.5 w-6 rounded-full bg-gray-900 transition-all duration-300",
          open ? "top-1.5 rotate-45" : "",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-0 top-1.5 block h-0.5 w-6 rounded-full bg-gray-900 transition-all duration-300",
          open ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-0 top-3 block h-0.5 w-6 rounded-full bg-gray-900 transition-all duration-300",
          open ? "top-1.5 -rotate-45" : "",
        ].join(" ")}
      />
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // header show/hide logic
  const [visible, setVisible] = useState(true);
  const [elevated, setElevated] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthed, logout } = useAuth();

  useEffect(() => {
    // route o‘zgarsa mobile menu yopilsin
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY;

      // glass + shadow kuchayishi uchun
      setElevated(y > 8);

      // juda yuqorida bo‘lsa doim ko‘rinsin
      if (y < 20) {
        setVisible(true);
        lastY = y;
        return;
      }

      // scroll down => yashir
      if (goingDown && y > 80) {
        setVisible(false);
      }

      // scroll up => ko‘rsat
      if (!goingDown) {
        setVisible(true);
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClasses = useMemo(() => {
    return [
      "fixed top-0 left-0 right-0 z-50",
      "border-b",
      elevated
        ? "bg-white/70 backdrop-blur-xl border-white/30 shadow-sm"
        : "bg-white/55 backdrop-blur-lg border-transparent",
    ].join(" ");
  }, [elevated]);

  const handleLogout = async () => {
    setMenuOpen(false);
    try {
      await logout(); // backend logout + user=null bo'lishi kerak
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      {/* Layout shift bo‘lmasin: fixed header uchun spacer */}
      <div className="h-16" />

      <motion.header
        className={headerClasses}
        initial={false}
        animate={visible ? { y: 0, opacity: 1 } : { y: -84, opacity: 0 }}
        transition={{ type: "spring", stiffness: 520, damping: 46 }}
      >
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500 text-white font-bold">
                U
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  toAISLE
                  to={l.to}
                  className="hover:text-gray-900 transition"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthed ? (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-700 hover:text-gray-900 transition"
                >
                  Sign In
                </Link>
                <Button as={Link} to="/signup" className="min-w-[96px]">
                  Sign Up
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={handleLogout}
                className="min-w-[96px]"
              >
                Logout
              </Button>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            {!isAuthed ? (
              <Link
                to="/login"
                className="text-sm text-gray-700 hover:text-gray-900 transition"
              >
                Sign In
              </Link>
            ) : (
              <Button
                type="button"
                onClick={handleLogout}
                className="min-w-[96px]"
              >
                Logout
              </Button>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white/70 backdrop-blur hover:bg-white transition"
              aria-label="Open menu"
            >
              <Hamburger open={menuOpen} />
            </button>
          </div>
        </Container>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobileMenu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-white/30"
            >
              <Container className="py-3">
                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -6, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-2"
                >
                  {navLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100/60 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}

                  {!isAuthed ? (
                    <Button
                      as={Link}
                      to="/signup"
                      className="mt-1"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="mt-1"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  )}
                </motion.div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
