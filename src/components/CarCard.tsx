"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Fuel, Settings2, MapPin, Gauge, ShieldCheck, UserCheck, Palette } from "lucide-react";
import { formatPrice, Car } from "@/lib/data";
import { cn } from "@/lib/utils";

interface CarCardProps {
  car: Car;
  index?: number;
  className?: string;
}

export function CarCard({ car, index = 0, className }: CarCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
      className={cn(
        "group relative bg-[#0e0e0e] border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col shadow-xl",
        className
      )}
    >
      <Link href={`/cars/${car.slug}`} className="block flex flex-col h-full">
        {/* Responsive Image container - 4/3 on mobile to preserve full car height/wheels/roof, 16/10 on tablet/desktop */}
        <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#141414]">
          <Image
            src={car.images[0]}
            alt={`${car.year} ${car.brand} ${car.model}`}
            fill
            quality={95}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index === 0}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
          
          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide">
              {car.year}
            </div>
            <div className="bg-black/80 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1">
              <ShieldCheck size={11} className="text-white" />
              Verified Listing
            </div>
          </div>

          {/* Location & Color badge on bottom of image */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <div className="bg-black/85 backdrop-blur-md text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1 border border-white/10">
              <MapPin size={11} className="text-white/60" />
              Reg: {car.registration}
            </div>
            {car.color && (
              <div className="bg-black/85 backdrop-blur-md text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1 border border-white/10">
                <Palette size={11} className="text-white/60" />
                {car.color}
              </div>
            )}
          </div>

          {/* Hover CTA on desktop */}
          <div className="hidden sm:flex absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <div className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-xl">
              View Listing <ArrowRight size={11} />
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3.5 bg-[#101010]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug group-hover:text-white transition-colors">
                {car.brand} {car.model}
              </h3>
            </div>
            <p className="text-xs text-zinc-400 font-medium">{car.year} • {car.variant}</p>
          </div>

          {/* Specifications Grid - High Contrast */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 border-y border-white/10 text-[11px] text-zinc-300 font-medium">
            <div className="flex items-center gap-1.5 min-w-0">
              <Gauge size={13} className="text-zinc-400 flex-shrink-0" />
              <span className="truncate">{car.mileage}</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <Fuel size={13} className="text-zinc-400 flex-shrink-0" />
              <span className="truncate">{car.fuel}</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <Settings2 size={13} className="text-zinc-400 flex-shrink-0" />
              <span className="truncate">{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <UserCheck size={13} className="text-zinc-400 flex-shrink-0" />
              <span className="truncate">{car.owners || "1st Owner"}</span>
            </div>
          </div>

          {/* Price & Action Row */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                Asking Price
              </p>
              <p className="text-base sm:text-lg font-black text-white tracking-tight mt-0.5">
                {car.price ? formatPrice(car.price) : (car.priceText || "Price on Request")}
              </p>
            </div>
            <span className="text-xs font-bold text-white bg-white/10 group-hover:bg-white group-hover:text-black px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 transition-all shadow-sm">
              Details <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
