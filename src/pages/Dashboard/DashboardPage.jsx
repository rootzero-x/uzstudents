import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
      <div className="mx-auto w-full max-w-6xl px-4 pt-5">
        {/* Content */}
        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          {/* Profile card */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
                  <img
                    src={profile.avatar_url}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/default.jpg";
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-base font-extrabold text-slate-900">
                    {profile.full_name}
                  </div>
                  <div className="truncate text-sm text-slate-600">
                    {profile.email}
                  </div>
                  <div className="mt-2 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                    {profile.provider === "google"
                      ? "Google Account"
                      : "Password Account"}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-600">Status</span>
                  <span className="font-extrabold text-emerald-600">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-600">Access</span>
                  <span className="font-extrabold text-slate-900">Student</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-600">Mode</span>
                  <span className="font-extrabold text-orange-600">Beta</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Welcome to UzStudents Dashboard 👋
                  </h1>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Platforma hozirda <b>Beta</b> rejimda. Tez orada sizning
                    platformangiz <b>OpenAI</b> bilan integratsiya qilinadi:
                    assignment tekshiruv, obyektiv scoring, token asosida AI
                    tekshiruv va o‘qituvchi paneli.
                  </p>
                </div>

                <div className="hidden sm:block">
                  <div className="rounded-2xl bg-orange-50 px-4 py-3 ring-1 ring-orange-100">
                    <div className="text-xs font-bold text-orange-700">
                      Upcoming
                    </div>
                    <div className="mt-0.5 text-sm font-extrabold text-orange-900">
                      AI Checking + Scoring
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature grid */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <FeatureCard
                  title="Assignments"
                  desc="Studentlar vazifani yuklaydi, o‘qituvchi tekshiradi. Tez orada AI avtomatik tahlil qo‘shiladi."
                  tag="In progress"
                />
                <FeatureCard
                  title="Objective Scoring"
                  desc="OpenAI token integratsiyasi orqali rubrika asosida ball berish va feedback."
                  tag="Planned"
                />
                <FeatureCard
                  title="Secure Auth"
                  desc="Email verification + Google sign-in. Dashboard faqat login orqali ochiladi."
                  tag="Ready"
                />
                <FeatureCard
                  title="RBAC (Roles)"
                  desc="Student / Teacher / Admin rollari, access control va himoyalangan route’lar."
                  tag="Next"
                />
              </div>

              {/* Info block */}
              <div className="mt-4 rounded-2xl bg-slate-900 p-5 text-white">
                <div className="text-sm font-extrabold">Beta Notes</div>
                <ul className="mt-2 space-y-2 text-sm text-slate-200">
                  <li>
                    • Hozirgi dashboard — preview. UI responsive
                    (mobile/tablet/desktop).
                  </li>
                  <li>
                    • AI integratsiya: token bilan ishlash, rate limit, audit
                    log rejalashtirilgan.
                  </li>
                  <li>
                    • Xavfsizlik: route protection + email verification 1
                    marttalik link.
                  </li>
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to="/courses"
                    className="rounded-xl bg-white/10 px-4 py-2 text-sm font-extrabold hover:bg-white/15"
                  >
                    View Courses
                  </Link>
                  <Link
                    to="/support"
                    className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-extrabold text-white hover:bg-orange-600"
                  >
                    Support
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer small */}
            <div className="mt-3 text-center text-xs text-slate-500">
              © {new Date().getFullYear()} UzStudents • Beta Preview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc, tag }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-extrabold text-slate-900">{title}</div>
        <div className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-slate-700 ring-1 ring-slate-200">
          {tag}
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
    </div>
  );
}
