"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  History,
  BadgeDollarSign,
  FileText,
  Shield,
  Car,
} from "lucide-react";
import { cn } from "@/lib/utils";

const trustItems = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Multi-Point Inspection",
    description: "Every vehicle undergoes a comprehensive 200-point inspection by certified technicians before listing.",
    size: "large",
  },
  {
    number: "02",
    icon: History,
    title: "Verified History",
    description: "Full ownership, accident, and service history verified through official records.",
    size: "medium",
  },
  {
    number: "03",
    icon: BadgeDollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees. The price you see is the price you pay.",
    size: "medium",
  },
  {
    number: "04",
    icon: FileText,
    title: "Documentation Assistance",
    description: "We handle all RC transfers, NOCs, and paperwork end-to-end.",
    size: "small",
  },
  {
    number: "05",
    icon: Shield,
    title: "Warranty Available",
    description: "Select vehicles come with extended warranty coverage.",
    size: "small",
  },
  {
    number: "06",
    icon: Car,
    title: "Test Drive Available",
    description: "Book a test drive at your convenience — at our showroom or your location.",
    size: "small",
  },
];

interface TrustItemProps {
  item: typeof trustItems[0];
  index: number;
}

function TrustItem({ item, index }: TrustItemProps) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      className={cn(
        "group relative bg-[#111] border border-white/6 rounded-xl p-6 overflow-hidden",
        "hover:border-white/12 transition-all duration-300",
        "hover:bg-[#141414]"
      )}
    >
      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.025) 0%, transparent 60%)" }}
      />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <span className="text-[10px] font-semibold text-white/20 tracking-[0.15em] uppercase">
            {item.number}
          </span>
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/8 transition-colors">
            <Icon size={16} className="text-white/50" />
          </div>
        </div>
        <h3 className="text-sm font-semibold text-white mb-2 leading-snug">{item.title}</h3>
        <p className="text-xs text-white/35 leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

export function TrustSection() {
  return (
    <section className="py-24 px-4 bg-[#080808]" aria-labelledby="trust-heading">
      <div className="max-w-[1360px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[11px] text-white/30 uppercase tracking-[0.18em] font-semibold mb-3">
            — Why Trust Us
          </p>
          <h2
            id="trust-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-white leading-tight max-w-lg"
          >
            Every Car Comes
            <br />
            Fully Verified.
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large card spanning 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-[#111] border border-white/6 rounded-xl p-8 overflow-hidden sm:row-span-2 hover:border-white/12 transition-all duration-300 hover:bg-[#141414]"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.03) 0%, transparent 60%)" }}
            />
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <span className="text-[10px] font-semibold text-white/20 tracking-[0.15em] uppercase">01</span>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/8 transition-colors">
                  <ClipboardCheck size={20} className="text-white/50" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3 leading-snug">Multi-Point Inspection</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Every vehicle undergoes a comprehensive 200-point inspection by certified technicians before listing on our platform. Engine, chassis, electricals, bodywork — nothing is left unchecked.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-3xl font-bold text-white/15 tracking-tight">200+</p>
                <p className="text-xs text-white/25 mt-1">Checkpoints per vehicle</p>
              </div>
            </div>
          </motion.div>

          {/* Remaining items */}
          {trustItems.slice(1).map((item, i) => (
            <TrustItem key={item.number} item={item} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
