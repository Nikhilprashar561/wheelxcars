"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { BRANDS, FUEL_TYPES, TRANSMISSION_TYPES, BODY_TYPES } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SearchState {
  brand: string;
  fuel: string;
  transmission: string;
  bodyType: string;
  budget: string;
}

const BUDGETS = [
  { label: "Under ₹5 Lakh", value: "0-5" },
  { label: "₹5 – ₹10 Lakh", value: "5-10" },
  { label: "₹10 – ₹20 Lakh", value: "10-20" },
  { label: "₹20 – ₹40 Lakh", value: "20-40" },
  { label: "Above ₹40 Lakh", value: "40-999" },
];

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="flex-1 min-w-0">
      <label className="block text-[10px] text-white/40 uppercase tracking-[0.12em] font-semibold mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none bg-white/5 border border-white/10 rounded-md",
            "px-3 py-2.5 text-sm pr-8",
            "focus:outline-none focus:border-white/30 transition-colors duration-200",
            "hover:border-white/20 cursor-pointer",
            value ? "text-white" : "text-white/40"
          )}
        >
          <option value="" className="bg-zinc-900">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-zinc-900">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={13}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
        />
      </div>
    </div>
  );
}

export function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState<SearchState>({
    brand: "",
    fuel: "",
    transmission: "",
    bodyType: "",
    budget: "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(search).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-16 px-4 pb-16">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
          className="bg-[#111111] border border-white/8 rounded-xl p-5 sm:p-6 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4">
            <SelectField
              label="Brand"
              value={search.brand}
              onChange={(v) => setSearch((s) => ({ ...s, brand: v }))}
              options={BRANDS}
              placeholder="Any Brand"
            />
            <SelectField
              label="Body Type"
              value={search.bodyType}
              onChange={(v) => setSearch((s) => ({ ...s, bodyType: v }))}
              options={BODY_TYPES}
              placeholder="Any Type"
            />
            <SelectField
              label="Budget"
              value={search.budget}
              onChange={(v) => setSearch((s) => ({ ...s, budget: v }))}
              options={BUDGETS.map((b) => b.label)}
              placeholder="Any Budget"
            />
            <SelectField
              label="Fuel"
              value={search.fuel}
              onChange={(v) => setSearch((s) => ({ ...s, fuel: v }))}
              options={FUEL_TYPES}
              placeholder="Any Fuel"
            />
            <SelectField
              label="Transmission"
              value={search.transmission}
              onChange={(v) => setSearch((s) => ({ ...s, transmission: v }))}
              options={TRANSMISSION_TYPES}
              placeholder="Any"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSearch}
              className="group inline-flex items-center gap-2.5 bg-white text-black font-semibold text-sm px-6 py-3 rounded-md hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto justify-center"
            >
              <Search size={15} />
              Find My Car
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
