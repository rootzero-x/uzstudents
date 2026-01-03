import { motion } from "framer-motion";

export default function TestimonialCard({
  quote,
  name,
  buttonLabel = "Read Full Story",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
    >
      <div className="p-6">
        <p className="text-sm leading-6 text-gray-700">{quote}</p>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gray-100" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{name}</p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-800 ring-1 ring-black/5 hover:bg-gray-100"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
