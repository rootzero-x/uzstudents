import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { Check } from "lucide-react";
import { pricing } from "../data/homeData";

function SectionHead({ title }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">
          Choose a plan that matches your learning goals.
        </p>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [mode, setMode] = useState("monthly");
  const plans = useMemo(
    () => (mode === "monthly" ? pricing.monthly : pricing.yearly),
    [mode]
  );

  return (
    <section id="pricing" className="mt-12">
      <Container>
        <div className="flex items-center justify-between gap-3">
          <SectionHead title="Our Pricing" />

          <div className="inline-flex rounded-full border border-gray-200 bg-white p-1">
            <button
              onClick={() => setMode("monthly")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                mode === "monthly"
                  ? "bg-orange-500 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setMode("yearly")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                mode === "yearly"
                  ? "bg-orange-500 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {plans.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.15) }}
            >
              <Card className={`p-6 ${p.highlight ? "border-orange-200" : ""}`}>
                <div className="text-sm text-gray-600">{p.name}</div>
                <div className="mt-3 flex items-end gap-2">
                  <div className="text-4xl font-semibold text-gray-900">
                    {p.price}
                  </div>
                  <div className="text-sm text-gray-500">{p.period}</div>
                </div>

                <div className="mt-4 text-xs text-gray-500 uppercase tracking-widest">
                  Available Features
                </div>

                <ul className="mt-3 space-y-2">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-orange-50 text-orange-600">
                        <Check size={14} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button className="mt-6 w-full">{p.cta}</Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
