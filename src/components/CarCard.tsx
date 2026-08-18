"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Fuel, Settings2, MapPin, Gauge, ShieldCheck } from "lucide-react";
import { formatPrice, formatEMI, Car } from "@/lib/data";
import { cn } from "@/lib/utils";

interface CarCardProps {
  car: Car;
  index?: number;
  className?: string;
}

export function CarCard({ car, index = 0, className }: CarCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
      className={cn("group relative bg-[#0e0e0e] border border-white/6 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300 flex flex-col", className)}
    >
      <Link href={`/cars/${car.slug}`} className="block flex flex-col h-full">
        {/* Image container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
          <Image
            src={car.images[0] || "/hero.jpg"}
            alt={`${car.year} ${car.brand} ${car.model}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wide">
              {car.year}
            </div>
            {car.source?.verified && (
              <div className="bg-black/80 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1">
                <ShieldCheck size={11} className="text-white" />
                Verified
              </div>
            )}
          </div>

          {/* Location badge on bottom left of image */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-black/80 backdrop-blur-md text-white/80 text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1">
              <MapPin size={10} className="text-white/60" />
              {car.city} · {car.locality}
            </div>
          </div>

          {/* Hover CTA */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <div className="bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-lg">
              View <ArrowRight size={11} />
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="p-5 flex flex-col flex-1 justify-between gap-4">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-base font-bold text-white leading-snug group-hover:text-white/90 transition-colors">
                {car.brand} {car.model}
              </h3>
            </div>
            <p className="text-xs text-white/40 line-clamp-1">{car.variant}</p>
          </div>

          {/* Specs row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-[11px] text-white/50">
            <div className="flex items-center gap-1.5">
              <Fuel size={12} className="text-white/30" />
              <span>{car.fuel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Settings2 size={12} className="text-white/30" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge size={12} className="text-white/30" />
              <span>{car.mileage || "N/A"}</span>
            </div>
          </div>

          {/* Price & Registration */}
          <div className="flex items-end justify-between pt-1">
            <div>
              <p className="text-lg font-bold text-white tracking-tight">
                {formatPrice(car.price)}
              </p>
              {car.emi && (
                <p className="text-[11px] text-white/35 mt-0.5">{formatEMI(car.emi)} est.</p>
              )}
            </div>
            <span className="text-[10px] text-white/30 font-medium">
              {car.registration.split(" ")[0]}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
