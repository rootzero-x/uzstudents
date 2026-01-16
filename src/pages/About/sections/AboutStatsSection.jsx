import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Activity } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function pretty(n, { compact = true } = {}) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";

  const abs = Math.abs(num);

  // 1000 dan kichik bo'lsa oddiy format
  if (!compact || abs < 1000) {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(
      num
    );
  }

  // 1000+ bo'lsa compact: 1K, 1.01K, 1.2M ...
  const nf = new Intl.NumberFormat(undefined, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: abs < 10000 ? 2 : abs < 100000 ? 1 : 0, // 1.01K / 12.3K / 123K
    minimumFractionDigits: 0,
  });

  // Ba'zi localelarda 1,01K kabi chiqadi — bu normal.
  // Agar doim nuqta bo'lsin desang, pastdagi qatorni yoqib qo'yamiz.
  return nf.format(num);
}


/** CountUp: once when inView */
function useCountUp(target, { inView = true } = {}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  const duration = useMemo(() => {
    const t = Math.max(0, Number(target) || 0);
    const d = 1.7 - Math.log10(t + 1) * 0.45;
    return clamp(d, 0.85, 1.7);
  }, [target]);

  useEffect(() => {
    if (!inView) return;
    if (startedRef.current) return;
    startedRef.current = true;

    const to = Math.max(0, Number(target) || 0);
    const start = performance.now();

    const tick = (now) => {
      const p = clamp((now - start) / (duration * 1000), 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [target, duration, inView]);

  return value;
}

/** Premium Card Shell */
function ProCard({ children, className = "" }) {
  return (
    <motion.article
      variants={fadeUp}
      className={[
        "group relative overflow-hidden rounded-[28px] bg-white",
        "shadow-[0_14px_44px_rgba(0,0,0,0.06)] ring-1 ring-black/5",
        "transition-transform duration-300 will-change-transform",
        "hover:-translate-y-[2px]",
        className,
      ].join(" ")}
    >
      {/* premium glass layer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/70" />

      {/* soft blobs (keeps your color identity) */}
      <div className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-[42px] bg-[#ff8a00] opacity-[0.10] blur-2xl" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-[52px] bg-slate-900 opacity-[0.05] blur-2xl" />

      {/* sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -left-1/3 top-0 h-full w-2/3 rotate-12 bg-gradient-to-r from-transparent via-white/45 to-transparent blur-[2px]" />
      </div>

      <div className="relative z-[1] p-6 sm:p-7">{children}</div>
    </motion.article>
  );
}

/** Premium progress bar */
function ProBar({ pct = 0, tone = "active", inView }) {
  const width = clamp(Number(pct) || 0, 0, 100);
  const fill =
    tone === "active"
      ? "linear-gradient(90deg, rgba(255,138,0,1), rgba(255,138,0,0.35))"
      : "linear-gradient(90deg, rgba(15,23,42,0.22), rgba(15,23,42,0.12))";

  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/5">
      <motion.div
        className="h-full rounded-full"
        style={{ background: fill }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${width}%` } : { width: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      />
    </div>
  );
}

/** Premium Donut (SVG) */
function ProDonut({ value, total, inView }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const pct = total > 0 ? clamp(value / total, 0, 1) : 0;
  const dash = c * pct;

  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 120 120" className="h-[120px] w-[120px] shrink-0">
        <defs>
          <linearGradient id="uz_ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,138,0,1)" />
            <stop offset="100%" stopColor="rgba(255,138,0,0.35)" />
          </linearGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* track */}
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="rgba(15,23,42,0.08)"
          strokeWidth="12"
        />

        {/* ring */}
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#uz_ring)"
          strokeWidth="12"
          strokeLinecap="round"
          filter="url(#softGlow)"
          strokeDasharray={`${dash} ${c - dash}`}
          transform="rotate(-90 60 60)"
          initial={{ strokeDasharray: `0 ${c}` }}
          animate={
            inView
              ? { strokeDasharray: `${dash} ${c - dash}` }
              : { strokeDasharray: `0 ${c}` }
          }
          transition={{ duration: 1.05, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center leading-tight">
          <p className="text-[12px] font-semibold text-black/55">Active</p>
          <p className="mt-0.5 text-2xl font-extrabold tracking-tight text-slate-900">
            {Math.round(pct * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
}

/** Premium mini bars */
function ProMiniBars({ values, inView }) {
  const max = Math.max(...values, 1);

  return (
    <div className="flex h-16 items-end gap-1.5 overflow-hidden">
      {values.map((v, i) => {
        const h = clamp((v / max) * 100, 10, 100);
        return (
          <motion.div
            key={i}
            className="w-3 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,138,0,0.95), rgba(255,138,0,0.22))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
            }}
            initial={{ height: 10, opacity: 0.55 }}
            animate={
              inView
                ? { height: `${h}%`, opacity: 1 }
                : { height: 10, opacity: 0.55 }
            }
            transition={{
              duration: 0.7,
              delay: 0.1 + i * 0.045,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          />
        );
      })}
    </div>
  );
}

/** Compact stat pill */
function StatPill({ icon: Icon, label, value, sub }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-4 ring-1 ring-black/5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-3xl bg-slate-900 opacity-[0.05]" />
      <div className="relative flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#fff7ee] ring-1 ring-black/5">
          <Icon className="h-5 w-5 text-[#ff8a00]" />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-black/60">{label}</p>
          <p className="mt-1 text-[26px] font-extrabold tracking-tight text-[#1c1c1c]">
            {pretty(value)}
          </p>
          {sub ? (
            <p className="mt-0.5 text-[12px] text-black/45">{sub}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SkeletonLine({ w = "w-40" }) {
  return <div className={`h-3 ${w} rounded bg-black/10`} />;
}

export default function AboutStatsSection() {
  const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    "https://694fc8f1e1918.myxvest1.ru/uzstudents/api";
  const endpoint = `${API_BASE}/stats/user_counts.php`;

  const [data, setData] = useState({ users: 0, pending_users: 0 });
  const [loading, setLoading] = useState(true);

  // inView trigger
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { root: null, threshold: 0.22 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(endpoint, {
          method: "GET",
          credentials: "include",
          signal: ac.signal,
          headers: { Accept: "application/json" },
        });

        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.ok) throw new Error("Bad response");

        setData({
          users: Number(json.users) || 0,
          pending_users: Number(json.pending_users) || 0,
        });
      } catch {
        setData({ users: 0, pending_users: 0 });
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [endpoint]);

  const usersCount = useCountUp(data.users, { inView });
  const pendingCount = useCountUp(data.pending_users, { inView });

  const total = Math.max(0, (data.users || 0) + (data.pending_users || 0));
  const activePct = total > 0 ? Math.round((data.users / total) * 100) : 0;

  // Realistik trend (keyin backend bilan almashtirsa bo‘ladi)
  const trend = useMemo(() => {
    const base = Math.max(18, Math.min(92, activePct || 40));
    return new Array(7).fill(0).map((_, i) => {
      const wave = Math.sin((i / 6) * Math.PI) * 9;
      const noise = ((i * 17) % 9) - 4;
      return clamp(Math.round(base + wave + noise), 10, 100);
    });
  }, [activePct]);

  return (
    <section ref={sectionRef} className="pb-10 sm:pb-14 overflow-x-hidden">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-90px" }}
          className="grid gap-5 sm:gap-6 lg:grid-cols-[1.25fr_.85fr]"
        >
          {/* Main premium card */}
          <ProCard>
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-black/5">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[12px] font-semibold text-black/55">
                    Live statistics
                  </span>
                </div>

                <h3 className="mt-3 text-[20px] sm:text-[22px] font-extrabold tracking-tight text-slate-900">
                  User activity insights
                </h3>
                <p className="mt-1 text-[13px] leading-5 text-black/50">
                  Active va Pending foydalanuvchilar: nisbat, trend va real-time
                  ko‘rinish.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl bg-white/75 px-4 py-3 ring-1 ring-black/5 backdrop-blur">
                <p className="text-[11px] font-semibold text-black/50">
                  Active share
                </p>
                <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
                  {loading ? "—" : `${activePct}%`}
                </p>
              </div>
            </div>

            {/* Body grid */}
            <div className="mt-6 grid gap-5 md:grid-cols-[.95fr_1.05fr]">
              {/* Left: donut + legend */}
              <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-black/60">
                    Active vs Pending
                  </p>
                  <Activity className="h-4 w-4 text-black/40" />
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <ProDonut value={data.users} total={total} inView={inView} />

                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[12px] font-semibold text-black/55">
                          Active
                        </span>
                        <span className="text-[12px] font-extrabold text-slate-900">
                          {loading ? "—" : pretty(usersCount)}
                        </span>
                      </div>
                      <ProBar pct={activePct} tone="active" inView={inView} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[12px] font-semibold text-black/55">
                          Pending
                        </span>
                        <span className="text-[12px] font-extrabold text-slate-900">
                          {loading ? "—" : pretty(pendingCount)}
                        </span>
                      </div>
                      <ProBar
                        pct={100 - activePct}
                        tone="pending"
                        inView={inView}
                      />
                    </div>

                    <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
                      {loading ? (
                        <div className="animate-pulse space-y-2">
                          <SkeletonLine w="w-32" />
                          <SkeletonLine w="w-44" />
                          <SkeletonLine w="w-24" />
                        </div>
                      ) : (
                        <p className="text-[12px] leading-5 text-black/55">
                          Hozir UzStudents’da{" "}
                          <b className="text-slate-900">{pretty(data.users)}</b>{" "}
                          ta faol va{" "}
                          <b className="text-slate-900">
                            {pretty(data.pending_users)}
                          </b>{" "}
                          ta yakunlanmagan ro‘yxat mavjud.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: trend */}
              <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-black/60">
                    Weekly activity trend
                  </p>
                  <span className="text-[11px] font-semibold text-black/45">
                    last 7 days
                  </span>
                </div>

                <div className="mt-4">
                  <ProMiniBars values={trend} inView={inView} />
                  <div className="mt-3 flex items-center justify-between text-[11px] text-black/45">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-3 ring-1 ring-black/5">
                    <p className="text-[11px] font-semibold text-black/45">
                      Active users
                    </p>
                    <p className="mt-1 text-[18px] font-extrabold text-slate-900">
                      {loading ? "—" : pretty(usersCount)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 ring-1 ring-black/5">
                    <p className="text-[11px] font-semibold text-black/45">
                      Pending users
                    </p>
                    <p className="mt-1 text-[18px] font-extrabold text-slate-900">
                      {loading ? "—" : pretty(pendingCount)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ProCard>

          {/* Right column compact pills */}
          <motion.div variants={fadeUp} className="grid gap-5 sm:gap-6">
            <StatPill
              icon={Users}
              label="Active users"
              value={loading ? 0 : usersCount}
              sub="Platformadan faol foydalanuvchilar"
            />
            <StatPill
              icon={UserPlus}
              label="Pending users"
              value={loading ? 0 : pendingCount}
              sub="Ro‘yxatdan o‘tishi yakunlanmaganlar"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
