import { motion } from "framer-motion";
import ModuleCard from "./ModuleCard";

export default function Curriculum({ modules, active, onSelect }) {
  return (
    <section className="bg-[#fafafa]">
      {/* ✅ Mobile fit: px-3 -> kichik ekranlarda ham sig‘adi */}
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-8 sm:py-10">
        {/* ✅ always 2 columns on md+, 1 column on mobile */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {modules.map((m, mIdx) => (
            <motion.div
              key={m.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.5, delay: mIdx * 0.04 }}
              className="w-full"
            >
              <ModuleCard
                module={m}
                active={active?.m === mIdx}
                activeLessonIndex={active?.m === mIdx ? active.l : -1}
                onSelectLesson={(lIdx) => onSelect(mIdx, lIdx)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
