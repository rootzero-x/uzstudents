import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const page = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const softCard = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-[calc(100dvh-0px)] bg-slate-50">
      {/* Premium backdrop (subtle, colors preserved) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-orange-200/25 blur-3xl" />
        <div className="absolute -bottom-44 right-[-140px] h-[620px] w-[620px] rounded-full bg-slate-200/60 blur-3xl" />
      </div>

      <motion.div
        variants={page}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl px-4 pt-5"
      >

        {/* Content */}
        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          {/* Profile */}
          <motion.div variants={softCard} className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              {/* subtle sheen (very low) */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div className="absolute -top-24 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-orange-200/25 blur-3xl" />
              </div>

              {/* Avatar centered + circle */}
              <div className="flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.15 }}
                  className="relative h-20 w-20 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200"
                >
                  <img
                    src={profile.avatar_url}
                    alt="Profile"
                    className="h-full w-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.src = "/default.jpg";
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/40" />
                </motion.div>

                <div className="mt-3 w-full min-w-0">
                  <div className="truncate text-base font-extrabold text-slate-900">
                    {profile.full_name}
                  </div>
                  <div className="truncate text-sm text-slate-600">
                    {profile.email}
                  </div>

                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-extrabold text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {profile.provider === "google"
                      ? "Google Account"
                      : "Password Account"}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-2 text-sm">
                <RowStat
                  label="Status"
                  value="Active"
                  valueClass="text-emerald-600"
                />
                <RowStat label="Access" value="Student" />
                <RowStat label="Mode" value="Beta" valueClass="text-orange-600" />
              </div>

              <div className="mt-4 grid gap-2">
                <Link
                  to="/support"
                  className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-extrabold text-slate-900 ring-1 ring-slate-100 hover:bg-slate-100"
                >
                  Support
                  <span className="ml-2 text-xs font-bold text-slate-500">
                    (help / feedback)
                  </span>
                </Link>

                <Link
                  to="/contact"
                  className="rounded-xl bg-orange-50 px-4 py-3 text-sm font-extrabold text-orange-900 ring-1 ring-orange-100 hover:bg-orange-100"
                >
                  Contact UzStudents
                  <span className="ml-2 text-xs font-bold text-orange-700">
                    (official)
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Main */}
          <motion.div variants={softCard} className="lg:col-span-8">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Welcome to UzStudents Dashboard
                  </h1>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    UzStudents — universitet talabalari uchun masofaviy ta’lim
                    platformasi. Hozirda <b>Beta</b> rejimda: kurslar, assignment
                    yuklash, tekshiruv va kelajakda <b>OpenAI</b> integratsiyasi
                    (obyektiv scoring, feedback, audit log, token nazorati,
                    teacher panel).
                  </p>
                </div>

                <div className="sm:block">
                  <div className="rounded-2xl bg-orange-50 px-4 py-3 ring-1 ring-orange-100">
                    <div className="text-xs font-bold text-orange-700">
                      Upcoming
                    </div>
                    <div className="mt-0.5 text-sm font-extrabold text-orange-900">
                      AI Checking + Scoring
                    </div>
                    <div className="mt-1 text-xs text-orange-700/90">
                      Token-based • Rubric • Feedback
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature grid */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <FeatureCard
                  title="Courses"
                  desc="Kurslarni ko‘rib chiqish va o‘rganish. Student sahifalari tayyor: Home/About/Contact/Course."
                  tag="Ready"
                />
                <FeatureCard
                  title="Assignments"
                  desc="Student vazifani yuklaydi, o‘qituvchi tekshiradi. Tez orada AI avtomatik tahlil qo‘shiladi."
                  tag="In progress"
                />
                <FeatureCard
                  title="Objective Scoring"
                  desc="OpenAI token integratsiyasi orqali rubrika asosida ball berish va aniq feedback."
                  tag="Planned"
                />
                <FeatureCard
                  title="Secure Auth + RBAC"
                  desc="Google sign-in, email verification, protected route va Student/Teacher/Admin rollari."
                  tag="Next"
                />
              </div>

              {/* Info block */}
              <div className="mt-4 overflow-hidden rounded-2xl bg-slate-900 p-5 text-white">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-sm font-extrabold">Beta Notes</div>
                    <ul className="mt-2 space-y-2 text-sm text-slate-200">
                      <li>• Dashboard — preview. UI responsive.</li>
                      <li>
                        • AI integratsiya: token, rate limit, audit log
                        rejalashtirilgan.
                      </li>
                      <li>
                        • Xavfsizlik: protected route, secure token handling va
                        RBAC yo‘l xaritasi.
                      </li>
                    </ul>
                  </div>

                  <div className="mt-2 sm:mt-0">
                    <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
                      <div className="text-xs font-bold text-slate-200">
                        Website
                      </div>
                      <div className="mt-0.5 text-sm font-extrabold text-white">
                        uzstudents.uz
                      </div>
                      <div className="mt-1 text-xs text-slate-300">
                        (deployment: /uzstudents/)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to="/courses"
                    className="inline-flex rounded-xl bg-white/10 px-4 py-2 text-sm font-extrabold hover:bg-white/15"
                  >
                    View Courses
                  </Link>
                  <Link
                    to="/support"
                    className="inline-flex rounded-xl bg-orange-500 px-4 py-2 text-sm font-extrabold text-white hover:bg-orange-600"
                  >
                    Support
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-3 text-center text-xs text-slate-500">
              © {new Date().getFullYear()} UzStudents • Beta Preview
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function RowStat({ label, value, valueClass = "text-slate-900" }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-100">
      <span className="text-slate-600">{label}</span>
      <span className={`font-extrabold ${valueClass}`}>{value}</span>
    </div>
  );
}

function FeatureCard({ title, desc, tag }) {
  const tagTone =
    tag === "Ready"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : tag === "In progress"
      ? "bg-orange-50 text-orange-700 ring-orange-100"
      : tag === "Planned"
      ? "bg-slate-100 text-slate-700 ring-slate-200"
      : "bg-white text-slate-700 ring-slate-200";

  return (
    <div className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 transition-transform duration-150 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-extrabold text-slate-900">{title}</div>
        <div
          className={`rounded-full px-3 py-1 text-xs font-extrabold ring-1 ${tagTone}`}
        >
          {tag}
        </div>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>

      <div className="mt-3 h-px w-full bg-slate-200/70" />

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="font-bold text-slate-500">UzStudents roadmap</span>
        <span className="font-extrabold text-slate-900 group-hover:text-orange-600">
          Details →
        </span>
      </div>
    </div>
  );
}
