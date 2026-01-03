import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../../components/ui/Container";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const VIDEO_SRC =
  "https://upload.wikimedia.org/wikipedia/commons/0/00/Wikipedia_in_Education_%284_of_12%29_Assignments.webm";

const POSTER_SRC = "/favicon.svg";

export default function VideoShowcase() {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showBanner, setShowBanner] = useState(true);

  const hasInteractedRef = useRef(false);
  const wasPlayingRef = useRef(false);

  const location = useLocation();

  const safePlay = async () => {
    try {
      await videoRef.current?.play();
      setPlaying(true);
      setShowBanner(false);
    } catch {}
  };

  const safePause = () => {
    videoRef.current?.pause();
    setPlaying(false);
    setShowBanner(true);
  };

  const togglePlay = async () => {
    hasInteractedRef.current = true;
    videoRef.current?.paused ? await safePlay() : safePause();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  // route o‘zgarsa pause
  useEffect(() => {
    safePause();
  }, [location.pathname]);

  useEffect(() => () => safePause(), []);

  // scroll out -> pause, scroll in -> resume (only if user played before)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          wasPlayingRef.current = playing;
          safePause();
          return;
        }
        if (hasInteractedRef.current && wasPlayingRef.current) {
          safePlay();
        }
      },
      { threshold: 0.55 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [playing]);

  return (
    <section className="mt-6">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
        >
          <div
            ref={wrapRef}
            className="relative aspect-[16/8] w-full cursor-pointer"
            onClick={togglePlay}
            role="button"
            tabIndex={0}
          >
            {/* VIDEO */}
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={VIDEO_SRC}
              muted={muted}
              playsInline
              preload="metadata"
              onPlay={() => {
                setPlaying(true);
                setShowBanner(false);
              }}
              onPause={() => {
                setPlaying(false);
                setShowBanner(true);
              }}
              onEnded={safePause}
            />

            {/* ===== BANNER ===== */}
            <AnimatePresence>
              {showBanner && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 bg-orange-500"
                >
                  {/* Center stack: U + (sm+ CTA). Hech qachon overlap bo‘lmaydi */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                    {/* U watermark */}
                    <img
                      src={POSTER_SRC}
                      alt="UzStudents"
                      draggable="false"
                      className="w-auto opacity-20 h-28 sm:h-44 md:h-56"
                    />

                    {/* CTA: only tablet/desktop, blur/glass, U ostida */}
                    <div className="hidden sm:flex mt-4 items-center justify-center">
                      <div className="inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-white backdrop-blur-xl">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/20">
                          <Play size={18} className="ml-0.5 opacity-95" />
                        </span>

                        <div className="text-left leading-tight">
                          <div className="text-sm font-semibold">
                            Watch how it works
                          </div>
                          <div className="text-xs opacity-80">
                            Tap to play • Auto pause on scroll
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* GRADIENT */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

            {/* BADGE (mobile smaller) */}
            <div className="pointer-events-none absolute left-3 top-3 sm:left-4 sm:top-4 rounded-xl border border-white/25 bg-white/10 backdrop-blur px-3 py-2">
              <div className="text-[10px] sm:text-xs font-semibold text-white">
                UzStudents Preview
              </div>
              <div className="text-[9px] sm:text-[11px] text-white/80">
                Learning • Assignments • Feedback
              </div>
            </div>

            {/* CONTROLS (mobile compact) */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="
                    inline-flex items-center gap-2 rounded-xl
                    border border-white/25 bg-white/10 text-white backdrop-blur-xl
                    h-9 px-3 text-xs
                    sm:h-11 sm:px-4 sm:text-sm
                  "
                >
                  {playing ? (
                    <Pause size={16} className="sm:hidden" />
                  ) : (
                    <Play size={16} className="sm:hidden" />
                  )}
                  {playing ? (
                    <Pause size={18} className="hidden sm:block" />
                  ) : (
                    <Play size={18} className="hidden sm:block" />
                  )}
                  <span className="font-medium">
                    {playing ? "Pause" : "Play Video"}
                  </span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="
                    inline-flex items-center justify-center rounded-xl
                    border border-white/25 bg-white/10 text-white backdrop-blur-xl
                    h-9 w-11
                    sm:h-11 sm:w-11
                  "
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? (
                    <VolumeX size={18} className="sm:hidden" />
                  ) : (
                    <Volume2 size={18} className="sm:hidden" />
                  )}
                  {muted ? (
                    <VolumeX size={20} className="hidden sm:block" />
                  ) : (
                    <Volume2 size={20} className="hidden sm:block" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
