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
      className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex flex-col justify-center overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* Seamless integrated background car visual with feathered blend */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/hero.jpg"
          alt="Premium verified pre-owned cars at WheelxCars"
          fill
          priority
          loading="eager"
          quality={95}
          className="object-cover object-[75%_bottom] sm:object-[center_bottom] lg:object-[68%_center]"
          sizes="100vw"
        />

        {/* Desktop Left-to-Right Seamless Gradient (Dark pure black on left for text, emerging cars on right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent via-40% hidden lg:block" />

        {/* Mobile & Tablet Top-to-Bottom Seamless Gradient (Dark pure black on top for text, cars visible at bottom) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/75 to-transparent via-50% lg:hidden" />

        {/* Seamless Edge Blends: Top and Bottom fades so image seamlessly connects to Navbar and SearchBar */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-black to-transparent" />
      </motion.div>

      {/* Atmospheric ambient glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-white/5 to-transparent rounded-full blur-3xl pointer-events-none z-[1]" />

      {/* Content Container - Cleanly placed over the seamlessly blended background */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 w-full flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl lg:max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-2.5 sm:mb-3.5">
            <span className="inline-flex items-center gap-2 text-zinc-300 text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase drop-shadow-sm">
              <span className="w-4 sm:w-6 h-px bg-white/40" />
              Pre-Owned · Inspected · Trusted
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] font-black leading-[1.03] tracking-tight text-white mb-3 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          >
            Find a Car
            <br />
            <span className="text-zinc-400">Worth</span> Driving.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm md:text-base text-zinc-200 leading-relaxed max-w-md mb-5 sm:mb-7 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            Verified pre-owned vehicles with documented inspection and transparent pricing across Tricity.
          </motion.p>

          {/* Linear CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto max-w-md sm:max-w-none"
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
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-white/25 bg-black/40 backdrop-blur-md text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-xl hover:border-white/60 hover:bg-white/10 transition-all duration-200 shadow-md text-center cursor-pointer"
            >
              <span>Sell Your Car</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
