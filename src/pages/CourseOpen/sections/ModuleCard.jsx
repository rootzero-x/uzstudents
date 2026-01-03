import { Clock, Play } from "lucide-react";

export default function ModuleCard({
  module,
  active,
  activeLessonIndex,
  onSelectLesson,
}) {
  return (
    <div
      className={[
        "relative w-full overflow-hidden rounded-2xl bg-white",
        "border p-4 sm:p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]",
        active ? "border-orange-200 ring-1 ring-orange-200/50" : "border-gray-100",
      ].join(" ")}
    >
      {/* number (absolute) */}
      <div className="pointer-events-none absolute right-4 top-4 text-4xl sm:text-5xl font-extrabold text-gray-900/90">
        {module.number}
      </div>

      <div className="min-w-0 pr-16">
        <div className="truncate text-sm font-semibold text-gray-900">
          {module.title}
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {module.lessons.map((l, idx) => {
          const isActiveLesson = active && activeLessonIndex === idx;

          return (
            <button
              key={l.title}
              type="button"
              onClick={() => onSelectLesson(idx)}
              className={[
                "w-full text-left rounded-xl border bg-white transition",
                "px-3 py-3 sm:px-4 sm:py-3",
                "min-w-0",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300",
                isActiveLesson
                  ? "border-orange-200 ring-1 ring-orange-200/40"
                  : "border-gray-100 hover:border-gray-200 hover:shadow-sm",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3 min-w-0">
                <div className="min-w-0">
                  <div className="truncate text-xs sm:text-sm font-semibold text-gray-800">
                    {l.title}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400">{l.sub}</div>

                  {isActiveLesson && (
                    <div className="mt-2 inline-flex items-center gap-2 rounded-xl border border-orange-200/70 bg-orange-50 px-3 py-2 text-[10px] sm:text-xs font-semibold text-orange-700">
                      <Play size={14} className="opacity-90" />
                      Now playing
                    </div>
                  )}
                </div>

                <div
                  className="
                    shrink-0 inline-flex items-center gap-2
                    rounded-xl border border-gray-100 bg-gray-50
                    px-3 py-2 text-[10px] sm:text-xs font-semibold text-gray-500
                    whitespace-nowrap max-w-[140px]
                  "
                >
                  <Clock size={14} className="opacity-70" />
                  {l.time}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
