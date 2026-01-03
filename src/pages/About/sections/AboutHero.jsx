import { motion } from "framer-motion";
import { aboutHero } from "../data/about.data";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: "easeOut" },
  }),
};

export default function AboutHero() {
  return (
    <section className="pt-10 sm:pt-14">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
        <div className="grid items-start gap-6 border-b border-black/5 pb-8 sm:pb-10 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-[28px] font-extrabold tracking-tight text-[#1c1c1c] sm:text-[40px]"
          >
            {aboutHero.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="max-w-[520px] text-sm leading-6 text-black/55 sm:text-[13px] sm:leading-6 md:justify-self-end"
          >
            {aboutHero.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
