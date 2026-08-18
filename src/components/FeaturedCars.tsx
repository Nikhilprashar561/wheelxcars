"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FEATURED_CARS } from "@/lib/data";
import { CarCard } from "./CarCard";

export function FeaturedCars() {
  return (
    <section className="py-24 px-4" aria-labelledby="featured-heading">
      <div className="max-w-[1360px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] text-white/30 uppercase tracking-[0.18em] font-semibold mb-3">
              — Featured Inventory
            </p>
            <h2
              id="featured-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-white leading-tight"
            >
              Cars Worth
              <br />
              Looking At.
            </h2>
            <p className="mt-3 text-sm text-white/40 max-w-sm leading-relaxed">
              Handpicked vehicles inspected for quality, condition and value.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <Link
              href="/cars"
              className="group inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors font-medium border-b border-white/10 hover:border-white/40 pb-px"
            >
              View all cars
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </div>

        {/* Cars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {FEATURED_CARS.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
