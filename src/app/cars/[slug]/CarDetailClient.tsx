"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Fuel,
  Settings2,
  MapPin,
  Gauge,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  MessageSquare,
  CreditCard,
} from "lucide-react";
import { CARS, formatPrice, formatEMI } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

// Get car by slug
function getCarBySlug(slug: string) {
  return CARS.find((c) => c.slug === slug);
}

interface CarDetailClientProps {
  slug: string;
}

export function CarDetailClient({ slug }: CarDetailClientProps) {
  const car = getCarBySlug(slug);
  if (!car) return notFound();

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goNext = () => setActiveIndex((i) => (i + 1) % car.images.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + car.images.length) % car.images.length);

  const specs = [
    { label: "Year", value: car.year.toString(), icon: Calendar },
    { label: "Fuel", value: car.fuel, icon: Fuel },
    { label: "Transmission", value: car.transmission, icon: Settings2 },
    { label: "Mileage", value: car.mileage || "—", icon: Gauge },
    { label: "Registration", value: car.registration, icon: MapPin },
    { label: "Owners", value: car.owners ? `${car.owners} Owner` : "—", icon: Users },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24 pb-24">
        <div className="max-w-[1360px] mx-auto px-4">
          {/* Back link */}
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Inventory
          </Link>

          <div className="grid lg:grid-cols-[1fr_420px] gap-10">
            {/* Left: Gallery */}
            <div>
              {/* Main image */}
              <div
                className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-900 mb-3 cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={car.images[activeIndex]}
                      alt={`${car.brand} ${car.model} — image ${activeIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Nav arrows */}
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); goPrev(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); goNext(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white/70 text-xs px-2.5 py-1 rounded-md">
                  {activeIndex + 1} / {car.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {car.images.length > 1 && (
                <div className="flex gap-2">
                  {car.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={cn(
                        "relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200",
                        i === activeIndex ? "border-white" : "border-transparent opacity-50 hover:opacity-80"
                      )}
                    >
                      <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}

              {/* Specs grid */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {specs.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div key={spec.label} className="bg-[#111] border border-white/6 rounded-xl p-4 flex gap-3 items-start">
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        <Icon size={13} className="text-white/40" />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/25 uppercase tracking-[0.1em] font-semibold">{spec.label}</p>
                        <p className="text-sm font-semibold text-white mt-0.5">{spec.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Description */}
              {car.description && (
                <div className="mt-8 bg-[#111] border border-white/6 rounded-xl p-6">
                  <h2 className="text-sm font-semibold text-white mb-3">About this Vehicle</h2>
                  <p className="text-sm text-white/45 leading-relaxed">{car.description}</p>
                </div>
              )}
            </div>

            {/* Right: Info panel */}
            <div className="lg:sticky lg:top-28 self-start">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#111] border border-white/6 rounded-2xl p-7 space-y-6"
              >
                {/* Vehicle name */}
                <div>
                  <p className="text-xs text-white/30 font-medium mb-1">{car.year}</p>
                  <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">
                    {car.brand} {car.model}
                  </h1>
                  <p className="text-sm text-white/40 mt-1">{car.variant}</p>
                </div>

                {/* Price */}
                <div className="border-t border-b border-white/5 py-5">
                  <p className="text-3xl font-bold text-white tracking-tight">
                    {formatPrice(car.price)}
                  </p>
                  {car.emi && (
                    <p className="text-sm text-white/35 mt-1">
                      EMI from <span className="text-white/55 font-medium">{formatEMI(car.emi)}</span>
                    </p>
                  )}
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="group w-full flex items-center justify-center gap-2.5 bg-white text-black font-semibold text-sm py-4 rounded-md hover:bg-white/90 transition-all duration-200 hover:scale-[1.01]"
                  >
                    <Phone size={15} />
                    Book a Test Drive
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2.5 border border-white/15 text-white font-semibold text-sm py-4 rounded-md hover:border-white/30 hover:bg-white/4 transition-all duration-200"
                  >
                    <MessageSquare size={15} />
                    Enquire Now
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2.5 border border-white/8 text-white/50 text-sm py-3.5 rounded-md hover:text-white hover:border-white/20 transition-all duration-200"
                  >
                    <CreditCard size={14} />
                    Get Financing
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-col gap-2 pt-2">
                  {[
                    "✓ 200-Point Inspected",
                    "✓ Verified Vehicle History",
                    "✓ Documentation Assistance",
                  ].map((item) => (
                    <p key={item} className="text-xs text-white/30 font-medium">{item}</p>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close image viewer"
            >
              <X size={22} />
            </button>
            <div className="relative w-full max-w-5xl aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={car.images[activeIndex]}
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {car.images.length > 1 && (
              <>
                <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" aria-label="Previous">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" aria-label="Next">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}
