"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Fuel, Settings2, MapPin, Gauge } from "lucide-react";
import { formatPrice, formatEMI } from "@/lib/data";
import { cn } from "@/lib/utils";

interface CarCardProps {
  car: {
    id: string;
    slug: string;
    brand: string;
    model: string;
    variant: string;
    year: number;
    price: number;
    emi?: number;
    fuel: string;
    transmission: string;
    registration: string;
    mileage?: string;
    images: string[];
  };
  index?: number;
  className?: string;
}

export function CarCard({ car, index = 0, className }: CarCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className={cn("group relative", className)}
    >
      <Link href={`/cars/${car.slug}`} className="block">
        {/* Image container */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900 mb-4">
          <Image
            src={car.images[0]}
            alt={`${car.year} ${car.brand} ${car.model}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Year badge */}
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wide">
            {car.year}
          </div>

          {/* Hover CTA */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <div className="bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5">
              View Details <ArrowRight size={11} />
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="space-y-3">
          {/* Title */}
          <div>
            <h3 className="text-base font-semibold text-white leading-snug group-hover:text-white/90 transition-colors">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-white/40 mt-0.5">{car.variant}</p>
          </div>

          {/* Specs row */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <Fuel size={11} className="text-white/30" />
              {car.fuel}
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <Settings2 size={11} className="text-white/30" />
              {car.transmission}
            </span>
            {car.mileage && (
              <>
                <span className="w-px h-3 bg-white/10" />
                <span className="flex items-center gap-1.5 text-xs text-white/40">
                  <Gauge size={11} className="text-white/30" />
                  {car.mileage}
                </span>
              </>
            )}
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <MapPin size={11} className="text-white/30" />
              {car.registration}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between pt-1 border-t border-white/5">
            <div>
              <p className="text-lg font-bold text-white tracking-tight">
                {formatPrice(car.price)}
              </p>
              {car.emi && (
                <p className="text-xs text-white/35 mt-0.5">{formatEMI(car.emi)} est.</p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
