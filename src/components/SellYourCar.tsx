"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function SellYourCar() {
  return (
    <section className="py-24 px-4 bg-[#080808]" aria-labelledby="sell-heading">
      <div className="max-w-[1360px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl bg-[#111] border border-white/8 p-10 sm:p-16 lg:p-20"
        >
          {/* Large decorative text */}
          <div
            className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden"
            aria-hidden
          >
            <span className="text-[180px] sm:text-[220px] font-black text-white/[0.018] tracking-tighter leading-none whitespace-nowrap">
              SELL
            </span>
          </div>

          <div className="relative z-10 max-w-xl">
            <p className="text-[11px] text-white/30 uppercase tracking-[0.18em] font-semibold mb-4">
              — Sell or Exchange
            </p>
            <h2
              id="sell-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em] text-white mb-4 leading-[1.05]"
            >
              Thinking About
              <br />
              Selling Your Car?
            </h2>
            <p className="text-sm text-white/45 leading-relaxed mb-8 max-w-sm">
              Get a transparent valuation and a completely hassle-free selling experience. 
              No negotiations. No delays. Just a fair price.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/sell-your-car"
                className="group inline-flex items-center justify-center gap-2.5 bg-white text-black font-semibold text-sm px-7 py-4 rounded-md hover:bg-white/90 transition-all duration-200 hover:scale-[1.02]"
              >
                Sell Your Car
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/15 text-white font-semibold text-sm px-7 py-4 rounded-md hover:border-white/35 hover:bg-white/5 transition-all duration-200"
              >
                Get a Valuation
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
