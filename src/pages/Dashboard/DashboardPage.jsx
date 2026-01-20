import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import MyGroupsCard from "./sections/MyGroupsCard";
import MyAssignmentsCard from "./sections/MyAssignmentsCard";

const page = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
  },
};

function TopProfileBar({ profile, onLogout }) {
  return (
    <div className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={profile.avatar_url}
            alt=""
            className="h-10 w-10 rounded-full object-cover ring-1 ring-black/5"
          />
          <div className="leading-tight">
            <div className="text-sm font-extrabold text-slate-900">
              {profile.full_name}
            </div>
            <div className="text-xs text-slate-500">{profile.email}</div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-slate-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const profile = useMemo(() => {
    const full_name = user?.full_name || "Student";
    const email = user?.email || "—";
    const provider = user?.provider || "password";
    const avatar_url =
      user?.avatar_url && String(user.avatar_url).trim()
        ? user.avatar_url
        : "/default.jpg";
    return { full_name, email, provider, avatar_url };
  }, [user]);

  return (
    <div className="min-h-[100dvh] bg-slate-50">
      {/* premium backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-44 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-200/25 blur-3xl" />
        <div className="absolute -bottom-44 right-[-140px] h-[620px] w-[620px] rounded-full bg-slate-200/60 blur-3xl" />
      </div>

      <TopProfileBar profile={profile} onLogout={logout} />

      <motion.div
        variants={page}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl px-4 py-5"
      >
        <div className="grid gap-4 lg:grid-cols-[420px_1fr]">
          {/* LEFT: Groups */}
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <MyGroupsCard />
          </div>

          {/* RIGHT: Assignments (big) */}
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <MyAssignmentsCard />
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} UzStudents • Beta Preview
        </div>
      </motion.div>
    </div>
  );
}
