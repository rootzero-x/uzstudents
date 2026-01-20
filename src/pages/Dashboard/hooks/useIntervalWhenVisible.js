import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function useIntervalWhenVisible(arg) {
  // ✅ supports: number OR options object
  const opts = useMemo(() => {
    if (typeof arg === "number") return { intervalMs: arg };
    if (arg && typeof arg === "object") return arg;
    return {};
  }, [arg]);

  const {
    intervalMs = 15000,
    enabled = true,
    onTick,
    rootMargin = "120px",
  } = opts;

  const nodeRef = useRef(null);
  const timerRef = useRef(null);
  const onTickRef = useRef(onTick);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const tickNow = useCallback(() => {
    if (typeof onTickRef.current === "function") onTickRef.current();
  }, []);

  const start = useCallback(() => {
    if (timerRef.current) return;
    if (!enabled || !intervalMs || intervalMs <= 0) return;
    timerRef.current = setInterval(() => {
      if (typeof onTickRef.current === "function") onTickRef.current();
    }, intervalMs);
  }, [enabled, intervalMs]);

  useEffect(() => {
    const onVis = () => {
      const visible = document.visibilityState === "visible";
      if (!visible) stop();
      else if (inView) start();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [inView, start, stop]);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const v = !!entries?.[0]?.isIntersecting;
        setInView(v);

        const tabVisible = document.visibilityState === "visible";
        if (v && tabVisible) start();
        else stop();
      },
      { root: null, rootMargin, threshold: 0.01 },
    );

    io.observe(el);

    return () => {
      try {
        io.disconnect();
      } catch {}
      stop();
    };
  }, [rootMargin, start, stop]);

  const attach = useCallback((node) => {
    nodeRef.current = node || null;
  }, []);

  useEffect(() => stop, [stop]);

  return { attach, visible: inView, inView, start, stop, tickNow };
}
