import { motion } from "framer-motion";

export default function CourseHero({ title, description }) {
  return (
    <section className="bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-4 pt-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-sm sm:text-base leading-7 text-gray-500"
          >
            {description}
          </motion.p>
        </div>

        <div className="mt-7 h-px w-full bg-gray-100" />
      </div>
    </section>
  );
}
