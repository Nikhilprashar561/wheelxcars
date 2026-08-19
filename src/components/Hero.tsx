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
  const imageY = useTransform(scrollY, [0, 600], [0, 60]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0, 0.4]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* Background image with parallax */}
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
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </motion.div>

      {/* Scroll-triggered additional darkening */}
      <motion.div
        className="absolute inset-0 bg-black z-[1]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Subtle spotlight top-left */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20 sm:pb-24 flex flex-col justify-center min-h-screen">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 text-white/50 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
              <span className="w-4 sm:w-6 h-px bg-white/30" />
              Pre-Owned · Inspected · Trusted
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[84px] font-bold leading-[0.95] tracking-[-0.03em] text-white mb-4 sm:mb-6"
          >
            Find a Car
            <br />
            <span className="text-white/50">Worth</span> Driving.
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-md mb-8 sm:mb-10 font-normal"
          >
            Handpicked pre-owned vehicles inspected for quality, condition, and value across Tricity. Complete pricing transparency and verified history.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/cars"
              className="group inline-flex items-center justify-center gap-2.5 bg-white text-black font-extrabold text-sm px-7 py-4 rounded-xl hover:bg-zinc-100 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xl"
            >
              Explore Cars
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
            <Link
              href="/sell-your-car"
              className="group inline-flex items-center justify-center gap-2.5 border border-white/20 bg-white/5 text-white font-bold text-sm px-7 py-4 rounded-xl hover:border-white/50 hover:bg-white/10 transition-all duration-200"
            >
              Sell Your Car
            </Link>
          </motion.div>

          {/* Value Highlights / Trust Markers */}
          <motion.div
            variants={itemVariants}
            className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/15 flex items-center gap-6 sm:gap-10 flex-wrap"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={16} className="text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-tight">Technical Inspection</span>
                <span className="text-[11px] text-zinc-300 font-medium">Multi-Point Check</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                <FileText size={15} className="text-zinc-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-tight">Verified Records</span>
                <span className="text-[11px] text-zinc-300 font-medium">Clear Ownership</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                <Sparkles size={15} className="text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-tight">Direct Transfer</span>
                <span className="text-[11px] text-zinc-300 font-medium">Hassle-Free Process</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] text-zinc-400 uppercase tracking-[0.15em] font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-zinc-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
