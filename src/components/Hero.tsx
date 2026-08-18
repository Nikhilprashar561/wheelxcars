"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

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
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
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
      <div className="relative z-10 max-w-[1360px] mx-auto px-6 pt-28 pb-24 flex flex-col justify-center min-h-screen">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 text-white/40 text-xs font-semibold tracking-[0.2em] uppercase">
              <span className="w-6 h-px bg-white/30" />
              Pre-Owned · Inspected · Trusted
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-[80px] xl:text-[88px] font-bold leading-[0.95] tracking-[-0.03em] text-white mb-6"
          >
            Find a Car
            <br />
            <span className="text-white/50">Worth</span> Driving.
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-white/50 leading-relaxed max-w-md mb-10 font-normal"
          >
            Every vehicle in our collection is carefully selected, 
            multi-point inspected, and priced with complete transparency.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/cars"
              className="group inline-flex items-center justify-center gap-2.5 bg-white text-black font-semibold text-sm px-7 py-4 rounded-md hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Cars
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
            <Link
              href="/sell-your-car"
              className="group inline-flex items-center justify-center gap-2.5 border border-white/20 text-white font-semibold text-sm px-7 py-4 rounded-md hover:border-white/50 hover:bg-white/5 transition-all duration-200"
            >
              Sell Your Car
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-14 pt-8 border-t border-white/10 flex items-center gap-10"
          >
            {[
              { number: "500+", label: "Cars Evaluated" },
              { number: "100+", label: "Cars Sold" },
              { number: "98%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white tracking-tight">{stat.number}</span>
                <span className="text-xs text-white/40 font-medium uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/30 uppercase tracking-[0.15em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
