"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { FEATURED_CARS, CARS } from "@/lib/data";
import { CarCard } from "./CarCard";

export function FeaturedCars() {
  return (
    <section className="py-24 px-4" aria-labelledby="featured-heading">
      <div className="max-w-[1360px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-[11px] text-white/40 uppercase tracking-[0.18em] font-semibold mb-3 flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-white/60" />
              Verified Inventory
            </p>
            <h2
              id="featured-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-white leading-tight"
            >
              Featured Vehicles.
            </h2>
            <p className="mt-3 text-sm text-white/40 max-w-md leading-relaxed">
              Every vehicle undergoes multi-point technical inspection with verified ownership documentation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <Link
              href="/cars"
              className="group inline-flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors font-medium border-b border-white/10 hover:border-white/40 pb-px"
            >
              View all inventory ({CARS.length})
              <ArrowRight
                size={13}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </div>

        {/* Cars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {FEATURED_CARS.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>

        {/* LOAD MORE CARS UI INTACT FOR FUTURE INVENTORY EXPANSION */}
        <div className="flex flex-col items-center justify-center pt-6 pb-2">
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 border border-white/15 text-white/80 hover:text-white hover:border-white/35 hover:bg-white/4 text-xs px-8 py-3.5 rounded-xl transition-all duration-200"
          >
            <span>Load More Cars</span>
            <ChevronDown size={14} className="text-white/40" />
          </Link>
          <p className="text-[11px] text-white/25 mt-3">
            Showing {FEATURED_CARS.length} of {CARS.length} verified listing
          </p>
        </div>
      </div>
    </section>
  );
}
