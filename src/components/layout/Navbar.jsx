import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { navLinks } from "../../pages/Home/data/homeData";
import { useAuth } from "../../context/AuthContext";

function Hamburger({ open }) {
  return (
    <div className="relative h-4 w-6">
      <span className={`absolute left-0 top-0 h-0.5 w-6 rounded-full bg-gray-900 transition-all duration-300 ${open ? "top-1.5 rotate-45" : ""}`} />
      <span className={`absolute left-0 top-1.5 h-0.5 w-6 rounded-full bg-gray-900 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
      <span className={`absolute left-0 top-3 h-0.5 w-6 rounded-full bg-gray-900 transition-all duration-300 ${open ? "top-1.5 -rotate-45" : ""}`} />
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [elevated, setElevated] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthed, logout } = useAuth();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setElevated(y > 8);
      if (y < 20) return setVisible(true);
      setVisible(y < lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ⭐ FINAL GLASS / GRADIENT BLUR
  const headerClasses = useMemo(
    () =>
      [
        "fixed top-0 left-0 right-0 z-50 border-b",
        "backdrop-blur-2xl",
        elevated
          ? "bg-white/75 border-white/40 shadow-[0_10px_40px_rgba(15,23,42,0.08)]"
          : "bg-white/60 border-transparent",
        // 👉 gradient glass overlay
        "before:absolute before:inset-0 before:pointer-events-none",
        "before:bg-gradient-to-b before:from-white/70 before:via-white/30 before:to-white/5",
        "before:opacity-80",
      ].join(" "),
    [elevated]
  );

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <div className="h-16" />

      <motion.header
        className={headerClasses}
        initial={false}
        animate={visible ? { y: 0, opacity: 1 } : { y: -84, opacity: 0 }}
        transition={{ type: "spring", stiffness: 520, damping: 46 }}
      >
        <Container className="relative flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500 text-white font-bold">
                U
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
              {isAuthed && (
                <Link to="/dashboard" className="hover:text-gray-900 transition">
                  Dashboard
                </Link>
              )}
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="hover:text-gray-900 transition">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {!isAuthed ? (
              <>
                <Link to="/login" className="text-sm text-gray-700 hover:text-gray-900 transition">
                  Sign In
                </Link>
                <Button as={Link} to="/signup" className="min-w-[96px]">
                  Sign Up
                </Button>
              </>
            ) : (
              <Button onClick={handleLogout} className="min-w-[96px]">
                Logout
              </Button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
            {!isAuthed ? (
              <Link to="/login" className="text-sm text-gray-700 hover:text-gray-900 transition">
                Sign In
              </Link>
            ) : (
              <Button onClick={handleLogout} className="min-w-[88px]">
                Logout
              </Button>
            )}

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white/70 backdrop-blur hover:bg-white transition"
              aria-label="Open menu"
            >
              <Hamburger open={menuOpen} />
            </button>
          </div>
        </Container>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-white/30"
            >
              <Container className="py-3 flex flex-col gap-2">
                {isAuthed && (
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-gray-100/60">
                    Dashboard
                  </Link>
                )}
                {navLinks.map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-gray-100/60">
                    {l.label}
                  </Link>
                ))}
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
