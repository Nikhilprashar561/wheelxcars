import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | WheelxCars Tricity",
  description: "Learn about WheelxCars — Chandigarh & Tricity's trusted pre-owned car marketplace built on transparency, inspection, and fair pricing.",
};

const values = [
  {
    number: "01",
    title: "100% Verified Tricity Inventory",
    body: "Every vehicle comes with documented ownership, official RTO history across CH, PB, and HR records, and zero fabricated claims.",
  },
  {
    number: "02",
    title: "Strict 200-Point Inspection",
    body: "From engine compression to chassis alignment and electrical health, every vehicle is inspected by certified technicians.",
  },
  {
    number: "03",
    title: "Fair Pricing Under ₹10 Lakh",
    body: "We focus on real value. No artificial dealer markups, no hidden surprise fees — honest prices tailored to our local market.",
  },
  {
    number: "04",
    title: "End-to-End Documentation",
    body: "From test drives in your sector to official RC transfer and NOC processing at Tricity RTOs, we manage the entire paperwork flow.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-28 pb-24 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">
          {/* Hero */}
          <div className="mb-20">
            <div className="flex items-center gap-2 text-[11px] text-white/40 uppercase tracking-[0.18em] font-semibold mb-4">
              <MapPin size={12} className="text-white/60" />
              <span>Chandigarh · Mohali · Panchkula · Zirakpur · Kharar</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.025em] text-white mb-6 leading-[1.05]">
              Built for a Better Car
              <br />
              Buying Experience in
              <br />
              <span className="text-white/40">Chandigarh &amp; Tricity.</span>
            </h1>
            <p className="text-base text-white/45 leading-relaxed max-w-xl">
              WheelxCars was created with a clear mission: make buying and selling used cars in the Tricity region transparent, honest, and truly premium. We connect verified local vehicles with genuine buyers without the typical dealership runaround.
            </p>
          </div>

          {/* Large quote */}
          <div className="border-l-2 border-white/10 pl-8 mb-20">
            <blockquote className="text-2xl sm:text-3xl font-semibold text-white/60 leading-snug max-w-2xl">
              &ldquo;Every vehicle on our marketplace has passed strict technical evaluation and verified ownership before it is presented to you.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-white/25">— The WheelxCars Tricity Team</p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">Our Core Standards</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map((v) => (
                <div key={v.number} className="bg-[#111] border border-white/6 rounded-xl p-6 flex gap-5">
                  <span className="text-xs font-bold text-white/20 mt-0.5 flex-shrink-0 tracking-[0.1em]">
                    {v.number}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">{v.title}</h3>
                    <p className="text-xs text-white/35 leading-relaxed">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
