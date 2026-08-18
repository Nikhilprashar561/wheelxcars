"use client";

import { motion } from "framer-motion";
import { Search, FileSearch, Car, Key } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Explore",
    description: "Browse our handpicked inventory filtered by brand, budget, or body type.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Inspect",
    description: "Review complete vehicle details, inspection reports and verified history.",
  },
  {
    number: "03",
    icon: Car,
    title: "Experience",
    description: "Book a test drive at our showroom or have us bring the car to you.",
  },
  {
    number: "04",
    icon: Key,
    title: "Drive Away",
    description: "Complete the paperwork, finalize financing, and drive away in your new car.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4" aria-labelledby="how-heading">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-[11px] text-white/30 uppercase tracking-[0.18em] font-semibold mb-3">
            — The Process
          </p>
          <h2
            id="how-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-white"
          >
            How It Works.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-px bg-white/6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  className="relative text-center lg:text-left"
                >
                  {/* Icon circle */}
                  <div className="w-14 h-14 rounded-full bg-[#111] border border-white/8 flex items-center justify-center mx-auto lg:mx-0 mb-5 relative z-10">
                    <Icon size={20} className="text-white/50" />
                  </div>

                  <span className="text-[10px] font-semibold text-white/20 tracking-[0.15em] uppercase block mb-2">
                    {step.number}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
