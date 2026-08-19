"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, ShieldCheck, FileText, Sparkles } from "lucide-react";

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
  const imageY = useTransform(scrollY, [0, 400], [0, 40]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[520px] sm:min-h-[600px] lg:min-h-[650px] flex flex-col justify-center overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* Background image with parallax & higher brightness */}
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
          className="object-cover object-center sm:object-[center_35%]"
          sizes="100vw"
        />
        {/* Balanced, brighter gradient overlays so cars are clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent sm:from-black/80 sm:via-black/35 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
      </motion.div>

      {/* Subtle Scroll-triggered darkening */}
      <motion.div
        className="absolute inset-0 bg-black z-[1] pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Subtle top-left glow */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Content Container - Compact & responsive */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-20 w-full flex flex-col justify-center">
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] font-black leading-[1.02] tracking-tight text-white mb-3 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          >
            Find a Car
            <br />
            <span className="text-zinc-400">Worth</span> Driving.
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-md mb-5 sm:mb-7 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            Handpicked pre-owned vehicles inspected for quality, condition, and value across Tricity. Complete pricing transparency and verified history.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-2.5 sm:gap-3"
          >
            <Link
              href="/cars"
              className="group inline-flex items-center justify-center gap-2.5 bg-white text-black font-extrabold text-xs sm:text-sm px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl hover:bg-zinc-100 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xl"
            >
              Explore Cars
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
            <Link
              href="/sell-your-car"
              className="group inline-flex items-center justify-center gap-2.5 border border-white/25 bg-black/40 backdrop-blur-sm text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl hover:border-white/60 hover:bg-white/10 transition-all duration-200 shadow-md"
            >
              Sell Your Car
            </Link>
          </motion.div>

          {/* Value Highlights / Trust Markers */}
          <motion.div
            variants={itemVariants}
            className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/15 flex items-center gap-4 sm:gap-8 flex-wrap"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0 shadow-md">
                <ShieldCheck size={15} className="text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-white tracking-tight drop-shadow-sm">Technical Inspection</span>
                <span className="text-[10px] sm:text-[11px] text-zinc-300 font-medium">Multi-Point Check</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0 shadow-md">
                <FileText size={14} className="text-zinc-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-white tracking-tight drop-shadow-sm">Verified Records</span>
                <span className="text-[10px] sm:text-[11px] text-zinc-300 font-medium">Clear Ownership</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0 shadow-md">
                <Sparkles size={14} className="text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-white tracking-tight drop-shadow-sm">Direct Transfer</span>
                <span className="text-[10px] sm:text-[11px] text-zinc-300 font-medium">Hassle-Free Process</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
