"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How does buying a car on WheelxCars work in Chandigarh & Tricity?",
    a: "Browse our verified Tricity inventory online, filter by city (Chandigarh, Mohali, Panchkula, Zirakpur, Kharar) or brand, and click 'Book a Test Drive' or 'Enquire'. Our local advisor will coordinate vehicle inspection and arrange doorstep test drives or a showroom visit.",
  },
  {
    q: "How are the vehicles inspected and verified?",
    a: "Every listed car undergoes a 200-point inspection covering engine health, transmission, suspension, brakes, electricals, and frame integrity. We also verify registration and service records with official RTO databases in CH, PB, and HR.",
  },
  {
    q: "Can I get a test drive delivered to my sector or locality?",
    a: "Yes. For serious buyers located in Chandigarh, Mohali, Panchkula, Zirakpur, and Kharar, we can arrange test drives directly at your home or office location upon confirmation.",
  },
  {
    q: "How does the RC Transfer process work for CH, PB, and HR registrations?",
    a: "We assist with all RTO transfer formalities, NOC issuance, road tax verification, and documentation across Chandigarh (CH01), Punjab (PB65/PB01), and Haryana (HR70) RTO authorities.",
  },
  {
    q: "How do I sell or exchange my car in the Tricity?",
    a: "Click 'Sell Your Car' in the navigation, enter your vehicle details, condition, photos, and expected price in our 6-step form. We review the submission and connect you with verified buyers or offer a direct valuation within 24 to 48 hours.",
  },
  {
    q: "Are the vehicle prices fixed and transparent?",
    a: "Yes. WheelxCars operates on 100% transparent, fair-market pricing across our entire inventory. Every vehicle listing includes verified paperwork, inspection reports, and zero hidden dealer commissions.",
  },
  {
    q: "Do you offer loan and EMI financing options?",
    a: "Yes, we work with nationalized and private banks (HDFC, ICICI, SBI, Axis) to offer attractive interest rates and quick EMI loan approvals for pre-owned cars in the Tricity area.",
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
            transition={{ duration: 0.35, ease: "easeOut" }}
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
              — Tricity Car Buying &amp; Selling
            </p>
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-white mb-4 leading-tight"
            >
              Frequently Asked
              <br />
              Questions.
            </h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Everything you need to know about buying, inspecting, test-driving, and selling pre-owned cars across Chandigarh, Mohali &amp; Tricity.
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
