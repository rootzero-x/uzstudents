import { motion } from "framer-motion";
import { aboutCta } from "../data/about.data";
import { Link } from "lucide-react";

export default function AboutCta() {
  return (
    <section className="pb-12 sm:pb-16">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_14px_50px_rgba(0,0,0,0.06)] ring-1 ring-black/5 sm:p-10"
        >
          {/* faint geometric bg */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
            <div className="absolute -right-12 top-1/2 h-64 w-64 -translate-y-1/2 rotate-45 rounded-3xl bg-black" />
            <div className="absolute right-24 top-1/2 h-48 w-48 -translate-y-1/2 rotate-45 rounded-3xl bg-black" />
            <div className="absolute right-56 top-1/2 h-36 w-36 -translate-y-1/2 rotate-45 rounded-3xl bg-black" />
          </div>

          <div className="relative z-[1] flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[680px]">
              <h3 className="text-[22px] font-extrabold tracking-tight text-[#1c1c1c] sm:text-[32px]">
                <span className="text-[#ff8a00]">{aboutCta.accent}</span>,{" "}
                {aboutCta.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-black/55 sm:text-[13px]">
                {aboutCta.subtitle}
              </p>
            </div>
            <Link href="https://t.me/uzstudents_official"/>
            <a href="https://t.me/uzstudents_official">
            <button
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#ff8a00] px-5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(255,138,0,0.25)] transition hover:brightness-95 active:translate-y-[1px]"
              type="button"
            >
              {aboutCta.button}
            </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
