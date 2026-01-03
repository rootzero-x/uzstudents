import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function CourseVideoShowcase({ video }) {
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

  // route change -> pause
  useEffect(() => {
    safePause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);
// ✅ video src change -> stop + reload (premium & stable)
useEffect(() => {
  try {
    videoRef.current?.pause();
    setPlaying(false);
    setShowBanner(true);
    if (videoRef.current) {
      videoRef.current.load();
    }
  } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [video.src]);

  return (
    <section className="bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
          className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white"
        >
          <div
            ref={wrapRef}
            className="relative aspect-[16/8] w-full cursor-pointer"
            onClick={togglePlay}
            role="button"
            tabIndex={0}
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={video.src}
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

            <AnimatePresence>
              {showBanner && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 bg-orange-500"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                    <img
                      src={video.poster}
                      alt="UzStudents"
                      draggable="false"
                      className="w-auto opacity-20 h-24 sm:h-40 md:h-52"
                    />

                    {/* CTA only tablet/desktop (screenshotga mos) */}
                    <div className="hidden sm:flex mt-4 items-center justify-center">
                      <div className="inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-white backdrop-blur-xl">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/20">
                          <Play size={18} className="ml-0.5 opacity-95" />
                        </span>

                        <div className="text-left leading-tight">
                          <div className="text-sm font-semibold">
                            {video.ctaTitle}
                          </div>
                          <div className="text-xs opacity-80">
                            {video.ctaSub}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

            {/* Badge */}
            <div className="pointer-events-none absolute left-3 top-3 sm:left-4 sm:top-4 rounded-xl border border-white/25 bg-white/10 backdrop-blur px-3 py-2">
              <div className="text-[10px] sm:text-xs font-semibold text-white">
                {video.badgeTitle}
              </div>
              <div className="text-[9px] sm:text-[11px] text-white/80">
                {video.badgeSub}
              </div>
            </div>

            {/* Controls */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur-xl h-9 px-3 text-xs sm:h-11 sm:px-4 sm:text-sm"
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
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur-xl h-9 w-11 sm:h-11 sm:w-11"
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
      </div>
    </section>
  );
}
