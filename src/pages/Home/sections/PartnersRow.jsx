import { motion } from "framer-motion";
import Container from "../../../components/ui/Container";
import { partners } from "../data/homeData";

export default function PartnersRow() {
  return (
    <section className="mt-10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="rounded-xl border border-gray-100 bg-white py-5"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-gray-400">
            {partners.map((p) => (
              <span
                key={p}
                className="text-xs sm:text-sm font-semibold uppercase tracking-widest"
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
