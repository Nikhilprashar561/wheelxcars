"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Arjun Mehta",
    vehicle: "2022 BMW 3 Series",
    location: "Mumbai",
    rating: 5,
    review:
      "The experience was unlike any used-car dealership I've been to. Every detail about the car was disclosed upfront. I drove away confident in my purchase.",
  },
  {
    id: 2,
    name: "Priya Nair",
    vehicle: "2023 Toyota Hyryder",
    location: "Bengaluru",
    rating: 5,
    review:
      "Absolutely seamless. From the test drive to the RC transfer, the team handled everything professionally. The car was exactly as described — spotless.",
  },
  {
    id: 3,
    name: "Rohit Sharma",
    vehicle: "2021 Audi A6",
    location: "Delhi",
    rating: 5,
    review:
      "I was skeptical about buying a used luxury car, but WheelxCars changed my mind. The inspection report was thorough and the price was genuinely fair.",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    vehicle: "2022 Hyundai Tucson",
    location: "Pune",
    rating: 5,
    review:
      "Responsive team, great communication, no pressure. They found me the exact car I was looking for within my budget. Will definitely come back.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="fill-white text-white" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 px-4" aria-labelledby="testimonials-heading">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[11px] text-white/30 uppercase tracking-[0.18em] font-semibold mb-3">
            — Customer Stories
          </p>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-white"
          >
            Trusted by Drivers.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="group bg-[#111] border border-white/6 rounded-xl p-6 hover:border-white/12 transition-all duration-300 hover:bg-[#141414] flex flex-col gap-4"
            >
              <StarRating count={t.rating} />
              <p className="text-sm text-white/60 leading-relaxed flex-1">&ldquo;{t.review}&rdquo;</p>
              <div className="pt-4 border-t border-white/5">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/30 mt-0.5">{t.vehicle} · {t.location}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
