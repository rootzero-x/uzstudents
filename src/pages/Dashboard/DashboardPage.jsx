import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

const msgWrap = {
  hidden: { opacity: 0, y: 10, scale: 0.99, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.28, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // =========================
  // PROFILE
  // =========================
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

  // =========================
  // AI CHAT — PREMIUM (NO INNER SCROLL)
  // =========================
  const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    "https://694fc8f1e1918.myxvest1.ru/uzstudents/api";

  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMsgs, setAiMsgs] = useState([
    {
      role: "assistant",
      text: "Salom! Men UzStudents AI Assistantman. Savolingizni yozing — qisqa va aniq javob beraman.",
    },
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiErr, setAiErr] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const [aiBlock, setAiBlock] = useState(null);
  // aiBlock = { code, message, blockedUntil, limitCount, blockSeconds }

  const [blockLeft, setBlockLeft] = useState(null);
  // blockLeft = { totalSec, h, m }

  const visibleMsgs = useMemo(() => {
    if (showHistory) return aiMsgs;
    const lastN = 6;
    return aiMsgs.length > lastN ? aiMsgs.slice(-lastN) : aiMsgs;
  }, [aiMsgs, showHistory]);

  useEffect(() => {
    if (!aiOpen) setShowHistory(false);
  }, [aiOpen]);

  useEffect(() => {
    if (!aiBlock?.blockedUntil) {
      setBlockLeft(null);
      return;
    }

    const tick = () => {
      const t = new Date(aiBlock.blockedUntil).getTime();
      const now = Date.now();
      const diff = Math.max(0, Math.floor((t - now) / 1000));
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      setBlockLeft({ totalSec: diff, h, m });

      if (diff <= 0) {
        // vaqt tugasa blokni tozalaymiz
        setAiBlock(null);
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [aiBlock?.blockedUntil]);

  const sendAi = async () => {
    const text = aiInput.trim();
    if (!text || aiLoading) return;

    setAiErr("");
    setAiInput("");

    setAiMsgs((p) => [...p, { role: "user", text }]);
    setAiLoading(true);

    try {
      const r = await fetch(`${API_BASE}/ai/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: text }),
      });

      const j = await r.json().catch(() => ({}));

      // ✅ 429 / rate limit (premium)
      if (r.status === 429) {
        const payload = {
          code: j?.code || "RATE_LIMIT",
          message: j?.message || "Cheklov sababli vaqtincha yopildi.",
          blockedUntil: j?.blocked_until || null,
          limitCount: j?.limit_count || null,
          blockSeconds: j?.block_seconds || null,
        };

        setAiBlock(payload);
        setAiErr("");

        // userga assistant bubble sifatida chiqaramiz
        setAiMsgs((p) => [
          ...p,
          { role: "assistant", text: payload.message },
        ]);

        return; // stop
      }

      // 413 / length
      if (r.status === 413) {
        setAiErr("");
        setAiMsgs((p) => [
          ...p,
          { role: "assistant", text: j?.message || "Xabar juda uzun." },
        ]);
        return;
      }

      if (!r.ok || !j.ok) throw new Error(j?.message || "AI error");

      // ✅ success
      setAiBlock(null);
      setAiMsgs((p) => [...p, { role: "assistant", text: j.reply || "—" }]);
    } catch (e) {
      setAiErr(e?.message || "Network error");
    } finally {
      setAiLoading(false);
    }
  };

  const clearChat = () => {
    setAiErr("");
    setAiInput("");
    setShowHistory(false);
    setAiBlock(null);
    setBlockLeft(null);
    setAiMsgs([
      {
        role: "assistant",
        text: "Chat tozalandi. Yangi savol yozishingiz mumkin.",
      },
    ]);
  };

  return (
    <div className="min-h-[calc(100dvh-0px)] bg-slate-50">
      {/* Premium backdrop */}
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
        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          {/* LEFT: PROFILE */}
          <motion.div variants={softCard} className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div className="absolute -top-24 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-orange-200/25 blur-3xl" />
              </div>

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
                <RowStat
                  label="Mode"
                  value="Beta"
                  valueClass="text-orange-600"
                />
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

                <button
                  onClick={onLogout}
                  className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white hover:bg-slate-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: MAIN */}
          <motion.div variants={softCard} className="lg:col-span-8">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Welcome to UzStudents Dashboard
                  </h1>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    UzStudents — universitet talabalari uchun masofaviy ta'lim
                    platformasi. Hozirda <b>Beta</b> rejimda: kurslar, assignment
                    yuklash, tekshiruv va kelajakda <b>OpenAI</b> integratsiyasi
                    (obyektiv scoring, feedback, audit log, token nazorati, teacher
                    panel).
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

              {/* ✅ Feature grid — ALWAYS ABOVE AI */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <FeatureCard
                  title="Courses"
                  desc="Kurslarni ko'rib chiqish va o'rganish. Student sahifalari tayyor: Home/About/Contact/Course."
                  tag="Ready"
                />
                <FeatureCard
                  title="Assignments"
                  desc="Student vazifani yuklaydi, o'qituvchi tekshiradi. Tez orada AI avtomatik tahlil qo'shiladi."
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

              {/* =========================
                 AI CHAT — PREMIUM (ANIMATIONS + ICONS + NO INNER SCROLL)
                 ========================= */}
              <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100">
                <button
                  type="button"
                  onClick={() => setAiOpen((v) => !v)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-sm font-extrabold text-slate-900">
                        AI Chat (Test)
                      </div>

                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-slate-700 ring-1 ring-slate-200">
                        <ShieldIcon /> Server-side
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-extrabold text-orange-700 ring-1 ring-orange-100">
                        <SparkIcon /> Beta
                      </span>
                    </div>

                    <div className="mt-1 text-xs leading-relaxed text-slate-600">
                      Ulanish tekshiruvi:{" "}
                      <span className="font-bold">
                        Dashboard → Backend → OpenAI
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-1.5 text-xs font-extrabold text-white">
                    {aiOpen ? "Close" : "Open"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {aiOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.25,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                      className="border-t border-slate-100"
                    >
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                        {/* Header actions */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-900">
                              <ChatIcon />
                              Live chat
                            </div>
                            <div className="mt-0.5 text-[11px] text-slate-500">
                              Qisqa savollar bering — aniq javob olasiz.
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {aiMsgs.length > 6 && (
                              <button
                                onClick={() => setShowHistory((v) => !v)}
                                className="rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                              >
                                {showHistory ? "Hide history" : "Show history"}
                              </button>
                            )}

                            <button
                              onClick={clearChat}
                              className="rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                            >
                              Clear
                            </button>
                          </div>
                        </div>

                        {/* Messages (NO SCROLL) */}
                        <div className="mt-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100 sm:p-4">
                          <div className="space-y-3 text-sm">
                            {aiMsgs.length > 6 && !showHistory && (
                              <div className="rounded-xl bg-white/70 px-3 py-2 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200">
                                <span className="mr-1">📌</span>
                                Ko'proq xabar bor — <b>Show history</b> bosib
                                ko'ring.
                              </div>
                            )}

                            <AnimatePresence initial={false}>
                              {visibleMsgs.map((m, idx) => (
                                <motion.div
                                  key={`${m.role}-${idx}-${m.text.slice(0, 14)}`}
                                  variants={msgWrap}
                                  initial="hidden"
                                  animate="show"
                                  exit="hidden"
                                  className={
                                    m.role === "user"
                                      ? "ml-auto w-fit max-w-full rounded-2xl bg-white px-4 py-2 text-slate-900 ring-1 ring-slate-200 break-words"
                                      : "mr-auto w-fit max-w-full rounded-2xl bg-orange-50 px-4 py-2 text-slate-900 ring-1 ring-orange-100 break-words"
                                  }
                                >
                                  {m.text}
                                </motion.div>
                              ))}
                            </AnimatePresence>

                            {/* Premium typing */}
                            <AnimatePresence>
                              {aiLoading && (
                                <motion.div
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 8 }}
                                  transition={{ duration: 0.2 }}
                                  className="mr-auto w-fit rounded-2xl bg-orange-50 px-4 py-2 ring-1 ring-orange-100"
                                >
                                  <div className="flex items-center gap-2 text-xs font-bold text-orange-700">
                                    <WaveIcon />
                                    <span>Javob tayyorlanmoqda</span>
                                    <TypingDots />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {aiBlock && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 overflow-hidden rounded-2xl bg-amber-50 ring-1 ring-amber-100"
                          >
                            <div className="flex items-start gap-3 px-4 py-3">
                              <div className="mt-0.5">
                                <svg width="18" height="18" viewBox="0 0 24 24" className="text-amber-700">
                                  <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                                </svg>
                              </div>

                              <div className="min-w-0">
                                <div className="text-xs font-extrabold text-amber-900">
                                  AI vaqtincha cheklangan
                                </div>

                                <div className="mt-1 text-[12px] leading-relaxed text-amber-800 whitespace-pre-line">
                                  {aiBlock.message}
                                </div>

                                {aiBlock.blockedUntil && (
                                  <div className="mt-2 inline-flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-extrabold text-amber-900 ring-1 ring-amber-200">
                                      Qayta ochiladi: {aiBlock.blockedUntil}
                                    </span>

                                    {blockLeft && blockLeft.totalSec > 0 && (
                                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-extrabold text-amber-900 ring-1 ring-amber-200">
                                        Qolgan vaqt: {blockLeft.h} soat {blockLeft.m} daqiqa
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {aiErr && (
                          <div className="mt-3 rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-700 ring-1 ring-red-100">
                            ⚠️ {aiErr}
                          </div>
                        )}

                        {/* Input */}
                        <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
                          <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                              <PencilIcon />
                            </span>
                            <input
                              value={aiInput}
                              onChange={(e) => setAiInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") sendAi();
                              }}
                              disabled={aiLoading || !!aiBlock}
                              placeholder="Savol yozing…"
                              className={`w-full rounded-xl bg-white pl-10 pr-4 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200 ${aiBlock ? "opacity-60 cursor-not-allowed" : ""}`}
                            />
                          </div>

                          <button
                            onClick={sendAi}
                            disabled={aiLoading || !!aiBlock}
                            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white hover:bg-slate-800 disabled:opacity-60 sm:w-auto"
                          >
                            Send
                          </button>
                        </div>

                        <div className="mt-2 text-[11px] text-slate-500">
                          <span className="mr-1">🔑</span>
                          OpenAI key faqat{" "}
                          <span className="font-bold">serverda</span> saqlanadi.
                          Frontendda token yo'q.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Info block */}
              <div className="mt-4 overflow-hidden rounded-2xl bg-slate-900 p-5 text-white">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-sm font-extrabold">Beta Notes</div>
                    <ul className="mt-2 space-y-2 text-sm text-slate-200">
                      <li>• Dashboard — preview. UI responsive.</li>
                      <li>
                        • AI: token nazorati, rate limit, audit log
                        rejalashtirilgan.
                      </li>
                      <li>
                        • Xavfsizlik: protected route, secure token handling,
                        RBAC yo'l xaritasi.
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

/* =========================
   PREMIUM ICONS + TYPING
   ========================= */
function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="text-slate-700">
      <path
        fill="currentColor"
        d="M12 2l8 4v6c0 5-3.1 9.4-8 10c-4.9-.6-8-5-8-10V6l8-4zm0 4.2L6 8.9V12c0 3.7 2.1 6.9 6 7.8c3.9-.9 6-4.1 6-7.8V8.9l-6-2.7z"
/>
</svg>
);
}
function SparkIcon() {
return (
<svg width="14" height="14" viewBox="0 0 24 24" className="text-orange-700">
<path
     fill="currentColor"
     d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2zm7 10l.9 2.8L23 16l-3.1 1.2L19 20l-.9-2.8L15 16l3.1-1.2L19 12z"
   />
</svg>
);
}
function ChatIcon() {
return (
<svg width="14" height="14" viewBox="0 0 24 24" className="text-slate-900">
<path
     fill="currentColor"
     d="M20 3H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3v3l4-3h9a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 14H10.3L8 18.8V17H4V5h16v12z"
   />
</svg>
);
}
function PencilIcon() {
return (
<svg width="16" height="16" viewBox="0 0 24 24" className="text-slate-500">
<path
     fill="currentColor"
     d="M3 17.25V21h3.75L17.8 9.95l-3.75-3.75L3 17.25zm18-11.5a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0l-1.3 1.3l3.75 3.75L21 5.75z"
   />
</svg>
);
}
function WaveIcon() {
return (
<svg width="16" height="16" viewBox="0 0 24 24" className="text-orange-700">
<path
     fill="currentColor"
     d="M3 12c2.5 0 2.5-4 5-4s2.5 4 5 4s2.5-4 5-4s2.5 4 5 4v2c-2.5 0-2.5 4-5 4s-2.5-4-5-4s-2.5 4-5 4s-2.5-4-5-4v-2z"
   />
</svg>
);
}
function TypingDots() {
return (
<span className="inline-flex items-center gap-1">
<span className="h-1.5 w-1.5 rounded-full bg-orange-700/70 animate-bounce [animation-delay:-0.18s]" />
<span className="h-1.5 w-1.5 rounded-full bg-orange-700/70 animate-bounce [animation-delay:-0.06s]" />
<span className="h-1.5 w-1.5 rounded-full bg-orange-700/70 animate-bounce" />
</span>
);
}