import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | WheelxCars",
  description: "Learn about WheelxCars — a premium pre-owned car marketplace built for the discerning buyer.",
};

const values = [
  {
    number: "01",
    title: "Transparency First",
    body: "Every listing includes complete vehicle history, inspection reports, and honest pricing. No hidden fees, no surprises.",
  },
  {
    number: "02",
    title: "Quality Over Quantity",
    body: "We evaluate hundreds of vehicles to list only the best. Our inventory is curated, not collected.",
  },
  {
    number: "03",
    title: "Customer-Centric",
    body: "Our advisors are guides, not salespeople. We're here to help you make the right decision, not the fastest one.",
  },
  {
    number: "04",
    title: "End-to-End Support",
    body: "From your first enquiry to the RC transfer, we handle every step of the process so you don't have to.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-28 pb-24 px-4">
        <div className="max-w-[1100px] mx-auto">
          {/* Hero */}
          <div className="mb-20">
            <p className="text-[11px] text-white/30 uppercase tracking-[0.18em] font-semibold mb-4">
              — Our Story
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.025em] text-white mb-6 leading-[1.05]">
              We believe buying
              <br />
              a used car should
              <br />
              <span className="text-white/40">feel premium.</span>
            </h1>
            <p className="text-base text-white/45 leading-relaxed max-w-xl">
              WheelxCars was founded on a simple idea: the pre-owned car market deserved better. 
              Better standards, better transparency, and a better buying experience. 
              We exist to bridge the gap between luxury and accessibility.
            </p>
          </div>

          {/* Large quote */}
          <div className="border-l-2 border-white/10 pl-8 mb-20">
            <blockquote className="text-2xl sm:text-3xl font-semibold text-white/60 leading-snug max-w-2xl">
              &ldquo;Every car in our inventory has passed our eyes, our hands, and our standards — before it ever reaches yours.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-white/25">— The WheelxCars Team</p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">What We Stand For</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map((v) => (
                <div key={v.number} className="bg-[#111] border border-white/6 rounded-xl p-6 flex gap-5">
                  <span className="text-xs font-bold text-white/15 mt-0.5 flex-shrink-0 tracking-[0.1em]">
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
