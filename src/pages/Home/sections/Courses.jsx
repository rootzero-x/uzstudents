import { motion } from "framer-motion";
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { courses } from "../data/homeData";

function SectionHead({ title }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">
          Browse our popular courses and start learning with structured lessons.
        </p>
      </div>
      <button className="text-sm text-gray-700 hover:text-gray-900 transition">
        View All
      </button>
    </div>
  );
}

export default function Courses() {
  return (
    <section className="mt-12">
      <Container>
        <SectionHead title="Our Courses" />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {courses.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.03, 0.2) }}
            >
              <Card className="overflow-hidden hover:shadow-sm transition-shadow">
                <div className="aspect-[16/8] w-full overflow-hidden bg-gray-100">
                  <img
                    className="h-full w-full object-cover"
                    src={c.img}
                    alt={c.title}
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Badge>{c.tagA}</Badge>
                      <Badge>{c.tagB}</Badge>
                    </div>
                    <span className="text-xs text-gray-500">{c.author}</span>
                  </div>

                  <h3 className="mt-3 font-semibold text-gray-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{c.desc}</p>

                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      Get Now
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
