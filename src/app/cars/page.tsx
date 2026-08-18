"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { CARS, BRANDS, FUEL_TYPES, TRANSMISSION_TYPES, BODY_TYPES } from "@/lib/data";
import { CarCard } from "@/components/CarCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { label: "Newest First", value: "year-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Lowest Mileage", value: "mileage-asc" },
];

interface Filters {
  brand: string;
  fuel: string;
  transmission: string;
  bodyType: string;
  budget: string;
}

function CarsPageContent() {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("year-desc");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const CARS_PER_PAGE = 6;

  const [filters, setFilters] = useState<Filters>({
    brand: searchParams.get("brand") || "",
    fuel: searchParams.get("fuel") || "",
    transmission: searchParams.get("transmission") || "",
    bodyType: searchParams.get("bodyType") || "",
    budget: searchParams.get("budget") || "",
  });

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const filtered = useMemo(() => {
    let result = [...CARS];

    if (filters.brand) result = result.filter((c) => c.brand === filters.brand);
    if (filters.fuel) result = result.filter((c) => c.fuel === filters.fuel);
    if (filters.transmission) result = result.filter((c) => c.transmission === filters.transmission);
    if (filters.bodyType) result = result.filter((c) => c.bodyType === filters.bodyType);

    // Sort
    if (sort === "year-desc") result.sort((a, b) => b.year - a.year);
    else if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [filters, sort]);

  const paginated = filtered.slice(0, page * CARS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const clearFilter = (key: keyof Filters) => {
    setFilters((s) => ({ ...s, [key]: "" }));
    setPage(1);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-28 pb-24 px-4">
        <div className="max-w-[1360px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-[11px] text-white/30 uppercase tracking-[0.18em] font-semibold mb-3">
              — Inventory
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.025em] text-white mb-2">
              Explore Our Collection.
            </h1>
            <p className="text-sm text-white/40">
              {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""} available
            </p>
          </motion.div>

          {/* Filter & Sort bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8 pb-6 border-b border-white/5">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md border transition-all duration-200",
                  showFilters
                    ? "bg-white text-black border-white font-semibold"
                    : "border-white/10 text-white/60 hover:border-white/25 hover:text-white"
                )}
              >
                <SlidersHorizontal size={14} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Active filter chips */}
              {Object.entries(filters).map(([key, value]) =>
                value ? (
                  <button
                    key={key}
                    onClick={() => clearFilter(key as keyof Filters)}
                    className="inline-flex items-center gap-1.5 text-xs border border-white/10 text-white/50 hover:text-white hover:border-white/25 px-3 py-1.5 rounded-md transition-colors"
                  >
                    {value}
                    <X size={11} />
                  </button>
                ) : null
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="appearance-none bg-transparent border border-white/10 text-white/60 hover:text-white text-sm rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-white/25 transition-colors cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} className="bg-zinc-900">
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-[#111] border border-white/6 rounded-xl p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { label: "Brand", key: "brand", options: BRANDS },
                  { label: "Fuel", key: "fuel", options: FUEL_TYPES },
                  { label: "Transmission", key: "transmission", options: TRANSMISSION_TYPES },
                  { label: "Body Type", key: "bodyType", options: BODY_TYPES },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-[10px] text-white/30 uppercase tracking-[0.12em] font-semibold mb-1.5">
                      {f.label}
                    </label>
                    <div className="relative">
                      <select
                        value={filters[f.key as keyof Filters]}
                        onChange={(e) => { setFilters((s) => ({ ...s, [f.key]: e.target.value })); setPage(1); }}
                        className="w-full appearance-none bg-white/4 border border-white/8 text-sm text-white/60 rounded-md px-3 py-2 pr-7 focus:outline-none focus:border-white/20 transition-colors cursor-pointer"
                      >
                        <option value="" className="bg-zinc-900">All</option>
                        {f.options.map((o) => (
                          <option key={o} value={o} className="bg-zinc-900">{o}</option>
                        ))}
                      </select>
                      <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                    </div>
                  </div>
                ))}
                <div className="flex items-end">
                  <button
                    onClick={() => { setFilters({ brand: "", fuel: "", transmission: "", bodyType: "", budget: "" }); setPage(1); }}
                    className="text-xs text-white/30 hover:text-white transition-colors border-b border-white/10 hover:border-white/30 pb-0.5"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Cars grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-white/30 text-lg">No vehicles match your filters.</p>
              <button
                onClick={() => setFilters({ brand: "", fuel: "", transmission: "", bodyType: "", budget: "" })}
                className="mt-4 text-sm text-white/50 hover:text-white border-b border-white/15 hover:border-white/40 pb-px transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {paginated.map((car, i) => (
                  <CarCard key={car.id} car={car} index={i} />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="inline-flex items-center gap-2 border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm px-8 py-3 rounded-md transition-all duration-200"
                  >
                    Load More
                    <ChevronDown size={14} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <CarsPageContent />
    </Suspense>
  );
}
