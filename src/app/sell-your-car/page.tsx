"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle, Car, BadgeDollarSign, Clock } from "lucide-react";

const benefits = [
  {
    icon: BadgeDollarSign,
    title: "Fair Market Valuation",
    desc: "We use real market data to give you a transparent, competitive offer for your vehicle.",
  },
  {
    icon: Clock,
    title: "Quick & Hassle-Free",
    desc: "Complete the process in as little as 48 hours. No endless negotiations, no delays.",
  },
  {
    icon: Car,
    title: "Exchange or Sell",
    desc: "Use your car's value as a down payment, or simply sell it outright. Your choice.",
  },
];

export default function SellYourCarPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", brand: "", year: "", mileage: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-28 pb-24 px-4">
        <div className="max-w-[1100px] mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="text-[11px] text-white/30 uppercase tracking-[0.18em] font-semibold mb-4">
              — Sell or Exchange
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.025em] text-white mb-4 leading-[1.05]">
              Thinking About
              <br />
              Selling Your Car?
            </h1>
            <p className="text-base text-white/45 max-w-md leading-relaxed">
              Get a transparent valuation and a completely hassle-free selling experience. 
              Fair price, fast process, full transparency.
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-3 gap-5 mb-16">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                  className="bg-[#111] border border-white/6 rounded-xl p-6"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                    <Icon size={16} className="text-white/40" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{b.title}</h3>
                  <p className="text-xs text-white/35 leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-[#111] border border-white/6 rounded-2xl p-8 sm:p-10 max-w-2xl"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <CheckCircle size={40} className="text-white/50" />
                <h3 className="text-xl font-bold text-white">Request Received</h3>
                <p className="text-sm text-white/40 max-w-xs">
                  We&apos;ll reach out within 24 hours with a valuation for your vehicle.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-white mb-6">Get Your Valuation</h2>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sell-name" className="block text-[10px] text-white/30 uppercase tracking-[0.12em] font-semibold mb-2">Your Name</label>
                      <input id="sell-name" type="text" required value={form.name} onChange={(e) => setForm(s => ({ ...s, name: e.target.value }))} placeholder="Full name" className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="sell-phone" className="block text-[10px] text-white/30 uppercase tracking-[0.12em] font-semibold mb-2">Phone Number</label>
                      <input id="sell-phone" type="tel" required value={form.phone} onChange={(e) => setForm(s => ({ ...s, phone: e.target.value }))} placeholder="+91 98765 43210" className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="sell-brand" className="block text-[10px] text-white/30 uppercase tracking-[0.12em] font-semibold mb-2">Car Brand</label>
                      <input id="sell-brand" type="text" required value={form.brand} onChange={(e) => setForm(s => ({ ...s, brand: e.target.value }))} placeholder="e.g. Toyota" className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="sell-year" className="block text-[10px] text-white/30 uppercase tracking-[0.12em] font-semibold mb-2">Year</label>
                      <input id="sell-year" type="text" value={form.year} onChange={(e) => setForm(s => ({ ...s, year: e.target.value }))} placeholder="e.g. 2020" className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="sell-mileage" className="block text-[10px] text-white/30 uppercase tracking-[0.12em] font-semibold mb-2">Mileage</label>
                      <input id="sell-mileage" type="text" value={form.mileage} onChange={(e) => setForm(s => ({ ...s, mileage: e.target.value }))} placeholder="e.g. 35,000 km" className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="sell-message" className="block text-[10px] text-white/30 uppercase tracking-[0.12em] font-semibold mb-2">Additional Details</label>
                    <textarea id="sell-message" rows={3} value={form.message} onChange={(e) => setForm(s => ({ ...s, message: e.target.value }))} placeholder="Any additional information about your vehicle..." className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="group w-full flex items-center justify-center gap-2.5 bg-white text-black font-semibold text-sm py-4 rounded-md hover:bg-white/90 transition-all duration-200 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>Get My Valuation <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" /></>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
