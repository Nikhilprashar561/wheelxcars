"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronDown, MapPin } from "lucide-react";
import { BRANDS, FUEL_TYPES, TRANSMISSION_TYPES, BODY_TYPES, LOCATIONS } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SearchState {
  keyword: string;
  location: string;
  brand: string;
  budget: string;
  fuel: string;
  transmission: string;
  bodyType: string;
}

const BUDGETS = [
  { label: "Under ₹3 Lakh", value: "0-3" },
  { label: "₹3 – ₹5 Lakh", value: "3-5" },
  { label: "₹5 – ₹7.5 Lakh", value: "5-7.5" },
  { label: "₹7.5 – ₹10 Lakh", value: "7.5-10" },
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
    <div className="flex-1 min-w-[140px]">
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
    keyword: "",
    location: "",
    brand: "",
    budget: "",
    fuel: "",
    transmission: "",
    bodyType: "",
  });

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (search.keyword) params.set("q", search.keyword);
    if (search.location) params.set("location", search.location);
    if (search.brand) params.set("brand", search.brand);
    if (search.budget) params.set("budget", search.budget);
    if (search.fuel) params.set("fuel", search.fuel);
    if (search.transmission) params.set("transmission", search.transmission);
    if (search.bodyType) params.set("bodyType", search.bodyType);

    router.push(`/cars?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-16 px-4 pb-16">
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="bg-[#111111] border border-white/8 rounded-xl p-5 sm:p-6 shadow-2xl"
        >
          {/* Quick search input */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-3.5 text-white/40 pointer-events-none" />
              <input
                type="text"
                value={search.keyword}
                onChange={(e) => setSearch((s) => ({ ...s, keyword: e.target.value }))}
                placeholder="Search model, variant, or feature in Tricity (e.g. Creta, Thar, Innova, Swift)..."
                className="w-full bg-white/5 border border-white/10 rounded-md pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </form>

          {/* Select filters row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
            <SelectField
              label="Location"
              value={search.location}
              onChange={(v) => setSearch((s) => ({ ...s, location: v }))}
              options={LOCATIONS}
              placeholder="All Tricity"
            />
            <SelectField
              label="Brand"
              value={search.brand}
              onChange={(v) => setSearch((s) => ({ ...s, brand: v }))}
              options={BRANDS}
              placeholder="All Brands"
            />
            <SelectField
              label="Max Budget"
              value={search.budget}
              onChange={(v) => setSearch((s) => ({ ...s, budget: v }))}
              options={BUDGETS.map((b) => b.label)}
              placeholder="Under ₹10 Lakh"
            />
            <SelectField
              label="Fuel"
              value={search.fuel}
              onChange={(v) => setSearch((s) => ({ ...s, fuel: v }))}
              options={FUEL_TYPES}
              placeholder="Any Fuel"
            />
            <SelectField
              label="Body Type"
              value={search.bodyType}
              onChange={(v) => setSearch((s) => ({ ...s, bodyType: v }))}
              options={BODY_TYPES}
              placeholder="Any Type"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <MapPin size={13} className="text-white/50" />
              <span>Verified listings across Chandigarh, Mohali, Panchkula, Zirakpur & Kharar</span>
            </div>
            <button
              onClick={() => handleSearch()}
              className="group inline-flex items-center gap-2.5 bg-white text-black font-semibold text-sm px-7 py-2.5 rounded-md hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto justify-center"
            >
              <Search size={14} />
              Find Verified Cars
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
