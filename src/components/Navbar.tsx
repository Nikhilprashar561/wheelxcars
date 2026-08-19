"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Cars", href: "/cars" },
  { label: "Sell Your Car", href: "/sell-your-car" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-black/95 backdrop-blur-md border-b border-white/5 py-1"
            : "bg-transparent py-1.5 sm:py-2"
        )}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group py-1" aria-label="WheelxCars Home">
            <div className="relative h-11 sm:h-14 md:h-16 w-44 sm:w-56 md:w-64">
              <Image
                src="/logo.png"
                alt="WheelxCars Logo"
                fill
                priority
                className="object-contain object-left scale-125 sm:scale-135 origin-left transition-transform duration-200 group-hover:scale-[1.4]"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 relative group",
                  pathname === link.href
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Direct CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/cars"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-100 transition-colors"
            >
              Explore Cars →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/8">
              <div className="relative h-11 w-44">
                <Image
                  src="/logo.png"
                  alt="WheelxCars Logo"
                  fill
                  className="object-contain object-left scale-125 origin-left"
                />
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col flex-1 justify-center px-6 gap-2" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block py-3.5 text-2xl font-bold tracking-tight transition-colors border-b border-white/10",
                      pathname === link.href ? "text-white" : "text-zinc-300 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="px-6 pb-10 pt-4 border-t border-white/10 space-y-3">
              <Link
                href="/cars"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-white text-black font-extrabold py-3.5 rounded-xl text-sm hover:bg-zinc-100 transition-colors shadow-lg"
              >
                Explore Cars →
              </Link>
              <a
                href="tel:+918054535453"
                className="flex items-center justify-center gap-2 w-full text-center bg-[#181818] border border-white/20 text-white font-bold py-3.5 rounded-xl text-xs hover:border-white/40 transition-colors cursor-pointer"
              >
                <Phone size={14} className="text-emerald-400" />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
