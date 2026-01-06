import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function pretty(n) {
  return new Intl.NumberFormat().format(n);
}

function useCountUp(target, { inView = true } = {}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  const duration = useMemo(() => {
    // Ko‘paygani sari tezlashsin:
    // kichik sonlarda ~1.6s, katta sonlarda ~0.9s atrofida
    const t = Math.max(0, Number(target) || 0);
    const d = 1.7 - Math.log10(t + 1) * 0.45;
    return clamp(d, 0.85, 1.7);
  }, [target]);

  useEffect(() => {
    if (!inView) return;

    // once start (premium UX)
    if (startedRef.current) return;
    startedRef.current = true;

    const to = Math.max(0, Number(target) || 0);
    const start = performance.now();

    const tick = (now) => {
      const p = clamp((now - start) / (duration * 1000), 0, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const next = Math.round(eased * to);
      setValue(next);

      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, inView]);

  return value;
}

function StatCard({ icon: Icon, title, value, note }) {
  return (
    <motion.article
      variants={fadeUp}
      className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5"
    >
      {/* soft bg */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-3xl bg-black" />
      </div>

      <div className="relative z-[1] flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#fff7ee] ring-1 ring-black/5">
          <Icon className="h-5 w-5 text-[#ff8a00]" />
        </div>

        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-black/60">{title}</p>
          <p className="mt-1 text-[28px] font-extrabold tracking-tight text-[#1c1c1c]">
            {pretty(value)}
          </p>
          {note ? (
            <p className="mt-1 text-[12px] leading-5 text-black/45">{note}</p>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default function AboutStatsSection() {
  const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    "https://694fc8f1e1918.myxvest1.ru/uzstudents/api";

  const endpoint = `${API_BASE}/stats/user_counts.php`;

  const [data, setData] = useState({ users: 0, pending_users: 0 });
  const [loading, setLoading] = useState(true);

  // view trigger: section ko‘ringanda start (viewport premium)
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { root: null, threshold: 0.25 }
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
      } catch (e) {
        // fail-safe: UI buzilmasin
        setData({ users: 0, pending_users: 0 });
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [endpoint]);

  const usersCount = useCountUp(data.users, { inView });
  const pendingCount = useCountUp(data.pending_users, { inView });

  return (
    <section ref={sectionRef} className="pb-10 sm:pb-14">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:gap-6 md:grid-cols-2"
        >
          <StatCard
            icon={Users}
            title="Active users"
            value={loading ? 0 : usersCount}
            note="Live statistikalar bazadan olinadi"
          />
          <StatCard
            icon={UserPlus}
            title="Pending users"
            value={loading ? 0 : pendingCount}
            note="Ro‘yxatdan o‘tishi yakunlanmaganlar"
          />
        </motion.div>
      </div>
    </section>
  );
}
