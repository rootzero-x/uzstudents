// src/pages/CourseOpen/CourseOpenPage.jsx
import { useEffect, useMemo, useState } from "react";
import CourseHero from "./sections/CourseHero";
import CourseVideoShowcase from "./sections/CourseVideoShowcase";
import Curriculum from "./sections/Curriculum";
import { courseOpenData } from "./data/courseOpenData";

function findDefaultActive(modules) {
  // default: first featured lesson if exists (screenshot like)
  for (let m = 0; m < modules.length; m++) {
    const idx = modules[m]?.lessons?.findIndex((l) => l.featured);
    if (idx >= 0) return { m, l: idx };
  }
  // fallback: 01 Lesson 02
  return { m: 0, l: 1 };
}

export default function CourseOpenPage() {
  // ✅ UX: routega kirganda tepadan boshlansin
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // ✅ only 4 modules guaranteed
  const modules = useMemo(() => courseOpenData.modules.slice(0, 4), []);

  const [active, setActive] = useState(() => findDefaultActive(modules));

  const activeLesson = modules?.[active.m]?.lessons?.[active.l];
  const activeVideoSrc = activeLesson?.videoSrc;

  const video = useMemo(
    () => ({
      ...courseOpenData.videoUI,
      src: activeVideoSrc, // ✅ selected lesson video
    }),
    [activeVideoSrc]
  );

  // ✅ safety fallback: if something changes in data and active becomes invalid
  useEffect(() => {
    if (!modules?.[active.m]?.lessons?.[active.l]) {
      setActive(findDefaultActive(modules));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modules]);

  return (
    <div className="min-h-screen bg-[#fafafa] overflow-x-hidden">
      <main className="pb-10">
        <CourseHero
          title={courseOpenData.hero.title}
          description={courseOpenData.hero.description}
        />

        {/* ✅ video changes when lesson changes */}
        <CourseVideoShowcase video={video} />

        {/* ✅ module/lesson highlight like screenshot + click -> change video */}
        <Curriculum
          modules={modules}
          active={active}
          onSelect={(mIdx, lIdx) => setActive({ m: mIdx, l: lIdx })}
        />
      </main>
    </div>
  );
}
