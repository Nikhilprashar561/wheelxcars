"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { CARS, LOCATIONS, TricityLocation } from "@/lib/data";
import { CarCard } from "./CarCard";
import { cn } from "@/lib/utils";

export function FeaturedCars() {
  const [selectedCity, setSelectedCity] = useState<string>("All");

  const filtered = selectedCity === "All"
    ? CARS.slice(0, 8)
    : CARS.filter((c) => c.city === selectedCity);

  return (
    <section className="py-24 px-4" aria-labelledby="featured-heading">
      <div className="max-w-[1360px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-[11px] text-white/40 uppercase tracking-[0.18em] font-semibold mb-3 flex items-center gap-1.5">
              <MapPin size={12} className="text-white/60" />
              Verified Tricity Inventory
            </p>
            <h2
              id="featured-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-white leading-tight"
            >
              Handpicked Cars
              <br />
              <span className="text-white/45">In Chandigarh & Tricity.</span>
            </h2>
            <p className="mt-3 text-sm text-white/40 max-w-md leading-relaxed">
              Every vehicle inspected with verified service history and transparent pricing under ₹10 Lakh.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            {/* City tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/8 rounded-lg overflow-x-auto max-w-full">
              <button
                onClick={() => setSelectedCity("All")}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap",
                  selectedCity === "All"
                    ? "bg-white text-black shadow-sm"
                    : "text-white/50 hover:text-white"
                )}
              >
                All Tricity
              </button>
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedCity(loc)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap",
                    selectedCity === loc
                      ? "bg-white text-black shadow-sm"
                      : "text-white/50 hover:text-white"
                  )}
                >
                  {loc}
                </button>
              ))}
            </div>

            <Link
              href="/cars"
              className="group inline-flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors font-medium border-b border-white/10 hover:border-white/40 pb-px"
            >
              View all ({CARS.length})
              <ArrowRight
                size={13}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </div>

        {/* Cars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
