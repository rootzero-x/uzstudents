import { motion } from "framer-motion";

export default function ContactHeroSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200/80 py-10 sm:py-14">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5 }}
              className="text-[40px] font-semibold leading-tight text-gray-900 sm:text-[56px]"
            >
              Contact Us
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="max-w-[640px] text-[14px] leading-6 text-gray-600 sm:text-[15px]"
            >
              Welcome to UzStudents Contact page. Send us your message and we’ll
              get back to you as soon as possible. Whether you’re a student or a
              teacher, we’re here to help with courses, assignments, and
              platform support.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
