import { useMemo, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const safeExternalProps = { target: "_blank", rel: "noopener noreferrer" };

export default function CourseOpenHeader({ nav, auth }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useMemo(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-3 py-4">
          {/* Logo */}
          <Link to="/uzstudents/" className="inline-flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white font-black">
              U
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {nav.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "rounded-xl px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to={auth.signUpTo}
              className="text-sm font-semibold text-gray-600 hover:text-gray-900"
            >
              Sign Up
            </Link>

            <Link
              to={auth.loginTo}
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to={auth.signUpTo}
              className="text-xs font-semibold text-gray-600"
            >
              Sign Up
            </Link>
            <Link
              to={auth.loginTo}
              className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white"
            >
              Login
            </Link>
            <button
              type="button"
              onClick={() => setOpen((s) => !s)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white"
              aria-label="Open menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden pb-4"
            >
              <div className="grid gap-2 rounded-2xl border border-gray-200 bg-white p-3">
                {nav.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* (optional) external docs safely */}
                <a
                  href="https://github.com/rootzero-x/uzstudents"
                  {...safeExternalProps}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  GitHub Repo
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* divider */}
      <div className="h-px w-full bg-gray-100" />
    </header>
  );
}
