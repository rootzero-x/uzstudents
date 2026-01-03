import { motion } from "framer-motion";
import { achievements } from "../data/about.data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function IconBadge({ Icon }) {
  return (
    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#fff7ee] ring-1 ring-black/5">
      <Icon className="h-5 w-5 text-[#ff8a00]" />
    </div>
  );
}

export default function AchievementsSection() {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
        <div className="space-y-2">
          <h2 className="text-[22px] font-extrabold tracking-tight text-[#1c1c1c] sm:text-[30px]">
            {achievements.title}
          </h2>
          <p className="max-w-[760px] text-sm leading-6 text-black/55 sm:text-[13px]">
            {achievements.subtitle}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2"
        >
          {achievements.items.map((it) => {
            const Icon = it.icon;
            return (
              <motion.article
                key={it.title}
                variants={card}
                className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
              >
                <IconBadge Icon={Icon} />
                <h3 className="mt-4 text-[15px] font-bold text-[#1c1c1c] sm:text-[16px]">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-black/55 sm:text-[13px]">
                  {it.desc}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
