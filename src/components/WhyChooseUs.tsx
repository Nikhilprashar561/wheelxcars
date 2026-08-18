"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Award, Users, Tag } from "lucide-react";

const metrics = [
  { number: "500+", label: "Vehicles Evaluated", icon: TrendingUp },
  { number: "100+", label: "Cars Sold", icon: Award },
  { number: "98%", label: "Customer Satisfaction", icon: Users },
  { number: "100%", label: "Transparent Pricing", icon: Tag },
];

const reasons = [
  {
    number: "01",
    title: "Rigorous Selection",
    body: "We evaluate hundreds of vehicles to list only the best. If it doesn't meet our standards, it doesn't make our inventory.",
  },
  {
    number: "02",
    title: "No Hidden Costs",
    body: "The price on the listing is the price you pay. We don't believe in surprise fees or last-minute charges.",
  },
  {
    number: "03",
    title: "Expert Guidance",
    body: "Our advisors are not salespeople. They're automotive experts dedicated to finding you the right car.",
  },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="py-24 px-4" aria-labelledby="why-heading">
      <div className="max-w-[1360px] mx-auto">
        {/* Top block */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] text-white/30 uppercase tracking-[0.18em] font-semibold mb-4">
              — Why WheelxCars
            </p>
            <h2
              id="why-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em] text-white leading-[1.05] mb-6"
            >
              Buying a Used Car
              <br />
              <span className="text-white/35">Shouldn&apos;t Feel Like</span>
              <br />
              a Gamble.
            </h2>
            <p className="text-sm text-white/45 leading-relaxed max-w-sm">
              Every vehicle is carefully selected, inspected and presented with complete transparency. 
              We exist to change how India buys pre-owned cars.
            </p>
          </motion.div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#111] border border-white/6 rounded-xl p-5 flex flex-col gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Icon size={15} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white tracking-tight">{m.number}</p>
                    <p className="text-xs text-white/35 mt-0.5 leading-tight">{m.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Reasons with vertical line */}
        <div className="relative">
          <motion.div
            className="absolute left-0 top-0 w-px bg-white/10 h-full origin-top"
            style={{ scaleY: lineScale }}
          />
          <div className="pl-8 space-y-10">
            {reasons.map((r, i) => (
              <motion.div
                key={r.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className="grid sm:grid-cols-[80px_1fr] gap-4"
              >
                <span className="text-xs font-semibold text-white/20 tracking-[0.12em] uppercase pt-0.5">
                  {r.number}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1.5">{r.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed max-w-lg">{r.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
