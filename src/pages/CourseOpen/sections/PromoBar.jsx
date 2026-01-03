import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function PromoBar({ text }) {
  return (
    <div className="bg-orange-500">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto max-w-6xl px-4"
      >
        <div className="flex items-center justify-center gap-2 py-2 text-[11px] sm:text-xs font-semibold text-white">
          <span className="truncate">{text}</span>
          <ArrowRight size={16} className="opacity-95" />
        </div>
      </motion.div>
    </div>
  );
}
