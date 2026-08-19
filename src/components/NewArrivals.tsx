"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { NEW_ARRIVAL_CARS } from "@/lib/data";
import Image from "next/image";
import { formatPrice } from "@/lib/data";

export function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-[#080808]" aria-labelledby="arrivals-heading">
      <div className="max-w-[1360px] mx-auto px-4 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] text-white/30 uppercase tracking-[0.18em] font-semibold mb-3">
              — Fresh Inventory
            </p>
            <h2
              id="arrivals-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-white"
            >
              Just Arrived.
            </h2>
          </motion.div>
          <Link
            href="/cars"
            className="group inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors font-medium border-b border-white/10 hover:border-white/40 pb-px self-end"
          >
            Browse all
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto hide-scrollbar px-4 sm:px-8 pb-4"
      >
        {NEW_ARRIVAL_CARS.map((car, i) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            className="flex-shrink-0 w-[280px] sm:w-[320px]"
          >
            <Link href={`/cars/${car.slug}`} className="group block">
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#141414] mb-4 border border-white/8">
                <Image
                  src={car.images[0]}
                  alt={`${car.year} ${car.brand} ${car.model}`}
                  fill
                  quality={85}
                  loading="lazy"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 280px, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  New Arrival
                </div>
                <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded flex items-center gap-1 border border-white/10">
                  <MapPin size={10} className="text-white/60" />
                  Reg: {car.registration}
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-white/90 transition-colors">
                  {car.year} {car.brand} {car.model}
                </h3>
                <p className="text-xs text-white/40 mt-0.5">{car.variant}</p>
                <p className="text-sm font-bold text-white mt-2 tracking-tight">
                  {car.price ? formatPrice(car.price) : (car.priceText || "Price on Request")}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
