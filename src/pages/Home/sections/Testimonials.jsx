import { motion } from "framer-motion";
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import { testimonials } from "../data/homeData";

function SectionHead({ title }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">
          What our learners say about their experience.
        </p>
      </div>
      <button className="text-sm text-gray-700 hover:text-gray-900 transition">View All</button>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="mt-12">
      <Container>
        <SectionHead title="Our Testimonials" />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.03, 0.2) }}
            >
              <Card className="p-5">
                <p className="text-sm text-gray-700 leading-relaxed">“{t.text}”</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-200" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">★★★★★</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
