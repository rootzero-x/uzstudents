import { motion } from "framer-motion";
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import { ArrowUpRight } from "lucide-react";
import { benefits } from "../data/homeData";

function SectionHead({ title }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">
          Explore the advantages of learning with a structured and practical
          approach.
        </p>
      </div>
      <button className="text-sm text-gray-700 hover:text-gray-900 transition">
        View All
      </button>
    </div>
  );
}

export default function Benefits() {
  return (
    <section className="mt-12">
      <Container>
        <SectionHead title="Benefits" />

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b, idx) => (
            <motion.div
              key={b.no}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.2) }}
            >
              <Card className="p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="text-3xl font-semibold text-gray-900">
                    {b.no}
                  </div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200">
                    <ArrowUpRight size={16} className="text-orange-500" />
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{b.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{b.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
