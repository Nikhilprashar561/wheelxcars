"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { BRANDS, FUEL_TYPES, TRANSMISSION_TYPES, BODY_TYPES } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SearchState {
  keyword: string;
  brand: string;
  fuel: string;
  transmission: string;
  bodyType: string;
}

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
    <div className="flex-1 min-w-0 w-full">
      <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5 truncate">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none bg-[#181818] border border-white/15 rounded-lg",
            "px-3.5 py-2.5 text-xs sm:text-sm pr-8 font-medium",
            "focus:outline-none focus:border-white/40 transition-colors duration-200",
            "hover:border-white/30 cursor-pointer shadow-inner",
            value ? "text-white font-semibold" : "text-zinc-400"
          )}
        >
          <option value="" className="bg-[#181818] text-zinc-400">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#181818] text-white">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
        />
      </div>
    </div>
  );
}

export function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState<SearchState>({
    keyword: "",
    brand: "",
    fuel: "",
    transmission: "",
    bodyType: "",
  });

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (search.keyword) params.set("q", search.keyword);
    if (search.brand) params.set("brand", search.brand);
    if (search.fuel) params.set("fuel", search.fuel);
    if (search.transmission) params.set("transmission", search.transmission);
    if (search.bodyType) params.set("bodyType", search.bodyType);

    router.push(`/cars?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-8 sm:-mt-12 px-4 pb-12 sm:pb-16">
      <div className="max-w-[1360px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-[#141414] border border-white/15 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl"
        >
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Top row: Keyword Search + Submit button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={search.keyword}
                  onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
                  placeholder="Search by make, model, variant (e.g. Creta, Thar, i10)..."
                  className="w-full bg-[#181818] border border-white/15 rounded-lg pl-10 pr-4 py-3 text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-white/40 transition-colors shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-extrabold text-xs sm:text-sm px-8 py-3 rounded-lg hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex-shrink-0 cursor-pointer"
              >
                <Search size={15} />
                Find Cars
              </button>
            </div>

            {/* Filter selectors row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/10">
              <SelectField
                label="Make"
                value={search.brand}
                onChange={(v) => setSearch({ ...search, brand: v })}
                options={BRANDS}
                placeholder="All Makes"
              />
              <SelectField
                label="Fuel"
                value={search.fuel}
                onChange={(v) => setSearch({ ...search, fuel: v })}
                options={FUEL_TYPES}
                placeholder="All Fuel"
              />
              <SelectField
                label="Gearbox"
                value={search.transmission}
                onChange={(v) => setSearch({ ...search, transmission: v })}
                options={TRANSMISSION_TYPES}
                placeholder="All Gearboxes"
              />
              <SelectField
                label="Body"
                value={search.bodyType}
                onChange={(v) => setSearch({ ...search, bodyType: v })}
                options={BODY_TYPES}
                placeholder="All Styles"
              />
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
