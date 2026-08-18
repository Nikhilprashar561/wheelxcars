"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How do I buy a car from WheelxCars?",
    a: "Browse our inventory online, find a car you like, and click 'Book a Test Drive'. Our team will confirm the appointment. Once you're satisfied, we handle all documentation and delivery.",
  },
  {
    q: "Are all your vehicles inspected?",
    a: "Yes, every vehicle undergoes a comprehensive 200-point inspection covering engine, transmission, brakes, electricals, body, and interior before being listed.",
  },
  {
    q: "Can I book a test drive?",
    a: "Absolutely. You can book a test drive directly from any car listing page. We offer drives at our showroom or we can arrange a drive at your preferred location.",
  },
  {
    q: "Do you provide financing assistance?",
    a: "Yes, we partner with leading banks and NBFCs to offer competitive loan options. Our finance team will help you get the best EMI plan suited to your budget.",
  },
  {
    q: "Can I sell or exchange my existing car?",
    a: "Yes. We offer a transparent valuation for your existing vehicle. You can use it as a down payment toward your next car or simply sell it to us outright.",
  },
  {
    q: "Do you help with RC transfer?",
    a: "Yes, we handle all RC transfer formalities, NOCs, and paperwork end-to-end so you don't have to worry about a thing.",
  },
  {
    q: "Is vehicle history available?",
    a: "Yes. For all listed vehicles, we provide a verified vehicle history report that includes ownership history, accident records, and service logs.",
  },
  {
    q: "Do select vehicles come with a warranty?",
    a: "Selected vehicles are available with an extended warranty. The warranty details are clearly mentioned on each car's listing page.",
  },
];

interface FAQItemProps {
  q: string;
  a: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ q, a, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-white/6"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "text-sm font-medium leading-snug transition-colors duration-200",
            isOpen ? "text-white" : "text-white/60 group-hover:text-white"
          )}
        >
          {q}
        </span>
        <div
          className={cn(
            "flex-shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center mt-0.5 transition-all duration-300",
            isOpen ? "rotate-45 border-white/30 bg-white/5" : "group-hover:border-white/20"
          )}
        >
          <Plus size={12} className="text-white/50" />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-white/40 leading-relaxed pb-5 max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 bg-[#080808]" aria-labelledby="faq-heading">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] text-white/30 uppercase tracking-[0.18em] font-semibold mb-4">
              — FAQ
            </p>
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-white mb-4 leading-tight"
            >
              Questions
              <br />
              Answered.
            </h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Everything you need to know about buying, selling, and financing with WheelxCars.
            </p>
          </motion.div>

          {/* FAQ list */}
          <div>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
