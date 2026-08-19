"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" as const, delay: 0.2 },
  },
};

export function Hero() {
  return (
    <section
      className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16 overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-white/5 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.25fr] gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & Linear Action Buttons */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-2.5 sm:mb-3.5">
              <span className="inline-flex items-center gap-2 text-zinc-300 text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase">
                <span className="w-4 sm:w-6 h-px bg-white/40" />
                Pre-Owned · Inspected · Trusted
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] font-black leading-[1.05] tracking-tight text-white mb-3 sm:mb-4"
            >
              Find a Car
              <br />
              <span className="text-zinc-400">Worth</span> Driving.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-lg mb-5 sm:mb-7 font-normal"
            >
              Handpicked, verified pre-owned vehicles with documented inspection and transparent pricing across Tricity.
            </motion.p>

            {/* Linear CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-row items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto"
            >
              <Link
                href="/cars"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white text-black font-extrabold text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-xl hover:bg-zinc-100 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xl text-center cursor-pointer"
              >
                <span>Explore Cars</span>
                <ArrowRight size={14} className="shrink-0" />
              </Link>
              <Link
                href="/sell-your-car"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-xl hover:border-white/40 transition-all shadow-md text-center cursor-pointer"
              >
                <span>Sell Your Car</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Unobstructed Vehicle Showcase */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-2xl overflow-hidden border border-white/12 shadow-2xl bg-[#0e0e0e] group"
          >
            <Image
              src="/hero.jpg"
              alt="Premium verified pre-owned cars at WheelxCars"
              fill
              priority
              loading="eager"
              quality={95}
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />

            {/* Verified badge tag */}
            <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Fleet Ready in Tricity</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
