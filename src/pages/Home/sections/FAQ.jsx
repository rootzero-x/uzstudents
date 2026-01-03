import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import { Plus, X } from "lucide-react";
import { faqs } from "../data/homeData";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mt-12 mb-14">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-2 text-sm text-gray-600">
              Here are answers to common questions about our courses and learning platform.
            </p>
            <button className="mt-4 text-sm text-gray-700 hover:text-gray-900 transition">
              View More
            </button>
          </div>

          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-5">
              <div className="space-y-2">
                {faqs.map((item, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div key={item.q} className="rounded-xl border border-gray-200 bg-white">
                      <button
                        className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left"
                        onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                      >
                        <span className="text-sm font-medium text-gray-900">{item.q}</span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200">
                          {isOpen ? <X size={16} /> : <Plus size={16} />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 text-sm text-gray-600">{item.a}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
