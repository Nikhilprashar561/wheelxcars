"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 400], [0, 30]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex flex-col justify-center overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* Background image with clean positioning */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        style={{ y: imageY }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/hero.jpg"
          alt="Premium pre-owned vehicles at WheelxCars"
          fill
          priority
          loading="eager"
          quality={90}
          className="object-cover object-[center_bottom] sm:object-[center_40%]"
          sizes="100vw"
        />
        {/* Soft, balanced gradient overlays to highlight the cars while keeping text crisp */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent sm:from-black/80 sm:via-black/35 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </motion.div>

      {/* Subtle top-left glow */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Content Container - Compact, uncluttered & sleek */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-16 w-full flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl lg:max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-2 sm:mb-3">
            <span className="inline-flex items-center gap-2 text-zinc-300 text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase drop-shadow-sm">
              <span className="w-4 sm:w-6 h-px bg-white/40" />
              Pre-Owned · Inspected · Trusted
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white mb-2.5 sm:mb-3.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
          >
            Find a Car
            <br />
            <span className="text-zinc-400">Worth</span> Driving.
          </motion.h1>

          {/* Supporting text - Clean and punchy */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm md:text-base text-zinc-200 leading-relaxed max-w-md mb-5 sm:mb-6 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            Verified pre-owned vehicles with documented inspection and transparent pricing across Tricity.
          </motion.p>

          {/* Linear CTAs on mobile and desktop */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto max-w-md sm:max-w-none"
          >
            <Link
              href="/cars"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white text-black font-extrabold text-xs sm:text-sm px-5 sm:px-7 py-3.5 rounded-xl hover:bg-zinc-100 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xl text-center cursor-pointer"
            >
              <span>Explore Cars</span>
              <ArrowRight size={14} className="shrink-0" />
            </Link>
            <Link
              href="/sell-your-car"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-white/25 bg-black/40 backdrop-blur-md text-white font-bold text-xs sm:text-sm px-5 sm:px-7 py-3.5 rounded-xl hover:border-white/60 hover:bg-white/10 transition-all duration-200 shadow-md text-center cursor-pointer"
            >
              <span>Sell Your Car</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
