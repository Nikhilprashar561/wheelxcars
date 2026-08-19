"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, Search, MapPin, RotateCcw, ShieldCheck } from "lucide-react";
import { CARS, BRANDS, FUEL_TYPES, TRANSMISSION_TYPES, BODY_TYPES, Car } from "@/lib/data";
import { CarCard } from "@/components/CarCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { label: "Newest Model Year", value: "year-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Lowest Mileage", value: "mileage-asc" },
  { label: "Featured Listings", value: "featured" },
];

interface FilterState {
  q: string;
  brand: string;
  fuel: string;
  transmission: string;
  bodyType: string;
  owners: string;
}

function CarsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sort, setSort] = useState("year-desc");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const CARS_PER_PAGE = 6;

  const [filters, setFilters] = useState<FilterState>({
    q: searchParams.get("q") || "",
    brand: searchParams.get("brand") || "",
    fuel: searchParams.get("fuel") || "",
    transmission: searchParams.get("transmission") || "",
    bodyType: searchParams.get("bodyType") || "",
    owners: searchParams.get("owners") || "",
  });

  // Sync state if URL searchParams changes externally
  useEffect(() => {
    setFilters({
      q: searchParams.get("q") || "",
      brand: searchParams.get("brand") || "",
      fuel: searchParams.get("fuel") || "",
      transmission: searchParams.get("transmission") || "",
      bodyType: searchParams.get("bodyType") || "",
      owners: searchParams.get("owners") || "",
    });
  }, [searchParams]);

  // Update URL on filter changes
  const updateURL = (newFilters: FilterState) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    router.replace(`/cars?${params.toString()}`, { scroll: false });
  };

  const setFilterKey = (key: keyof FilterState, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    setPage(1);
    updateURL(updated);
  };

  const clearAllFilters = () => {
    const reset: FilterState = {
      q: "",
      brand: "",
      fuel: "",
      transmission: "",
      bodyType: "",
      owners: "",
    };
    setFilters(reset);
    setPage(1);
    updateURL(reset);
  };

  const activeFilterCount = Object.entries(filters).filter(([k, v]) => Boolean(v)).length;

  const filtered = useMemo(() => {
    let result = [...CARS];

    // Keyword Search
    if (filters.q.trim()) {
      const qLower = filters.q.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.brand.toLowerCase().includes(qLower) ||
          c.model.toLowerCase().includes(qLower) ||
          c.variant.toLowerCase().includes(qLower) ||
          (c.description && c.description.toLowerCase().includes(qLower)) ||
          (c.color && c.color.toLowerCase().includes(qLower))
      );
    }

    // Brand
    if (filters.brand) {
      result = result.filter((c) => c.brand.toLowerCase() === filters.brand.toLowerCase());
    }

    // Fuel
    if (filters.fuel) {
      result = result.filter((c) => c.fuel.toLowerCase() === filters.fuel.toLowerCase());
    }

    // Transmission
    if (filters.transmission) {
      result = result.filter((c) => c.transmission.toLowerCase() === filters.transmission.toLowerCase());
    }

    // Body Type
    if (filters.bodyType) {
      result = result.filter((c) => c.bodyType.toLowerCase() === filters.bodyType.toLowerCase());
    }

    // Sorting
    if (sort === "year-desc") {
      result.sort((a, b) => b.year - a.year);
    } else if (sort === "price-asc") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === "price-desc") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sort === "mileage-asc") {
      result.sort((a, b) => (a.kmDriven || 0) - (b.kmDriven || 0));
    } else if (sort === "featured") {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [filters, sort]);

  const paginated = filtered.slice(0, page * CARS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-20 sm:pt-28 pb-24 px-3.5 sm:px-6 w-full max-w-full overflow-x-hidden">
        <div className="max-w-[1360px] mx-auto w-full min-w-0">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 uppercase tracking-[0.18em] font-bold mb-2">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>Verified Pre-Owned Collection</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.025em] text-white mb-2">
                Available Inventory.
              </h1>
              <p className="text-sm text-zinc-400 font-medium">
                Browse handpicked, inspected pre-owned vehicles across Tricity with transparent pricing.
              </p>
            </motion.div>
          </div>

          {/* Search bar & Controls row */}
          <div className="bg-[#141414] border border-white/12 rounded-2xl p-4 mb-6 space-y-4 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Keyword Search */}
              <div className="relative flex-1 w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={filters.q}
                  onChange={(e) => setFilterKey("q", e.target.value)}
                  placeholder="Search model, variant, or color (e.g. Creta, Thar, i10)..."
                  className="w-full bg-[#181818] border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-white/40 transition-colors shadow-inner"
                />
                {filters.q && (
                  <button
                    onClick={() => setFilterKey("q", "")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Filter Toggle & Sort */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-between">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg border transition-all cursor-pointer shadow-sm",
                    showFilters
                      ? "bg-white text-black border-white"
                      : "border-white/15 bg-[#181818] text-white hover:border-white/30"
                  )}
                >
                  <SlidersHorizontal size={14} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-1 bg-white text-black text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => {
                      setSort(e.target.value);
                      setPage(1);
                    }}
                    className="appearance-none bg-[#181818] border border-white/15 text-white font-semibold text-xs rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:border-white/40 transition-colors cursor-pointer shadow-sm"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value} className="bg-zinc-900 text-white">
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-white/10">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-bold">Active:</span>
                {filters.brand && (
                  <button
                    onClick={() => setFilterKey("brand", "")}
                    className="inline-flex items-center gap-1.5 text-xs bg-white/8 hover:bg-white/12 text-white px-2.5 py-1 rounded-md transition-colors"
                  >
                    Make: {filters.brand} <X size={11} />
                  </button>
                )}
                {filters.fuel && (
                  <button
                    onClick={() => setFilterKey("fuel", "")}
                    className="inline-flex items-center gap-1.5 text-xs bg-white/8 hover:bg-white/12 text-white px-2.5 py-1 rounded-md transition-colors"
                  >
                    Fuel: {filters.fuel} <X size={11} />
                  </button>
                )}
                {filters.transmission && (
                  <button
                    onClick={() => setFilterKey("transmission", "")}
                    className="inline-flex items-center gap-1.5 text-xs bg-white/8 hover:bg-white/12 text-white px-2.5 py-1 rounded-md transition-colors"
                  >
                    Gearbox: {filters.transmission} <X size={11} />
                  </button>
                )}
                {filters.bodyType && (
                  <button
                    onClick={() => setFilterKey("bodyType", "")}
                    className="inline-flex items-center gap-1.5 text-xs bg-white/8 hover:bg-white/12 text-white px-2.5 py-1 rounded-md transition-colors"
                  >
                    Type: {filters.bodyType} <X size={11} />
                  </button>
                )}
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white underline ml-2 transition-colors"
                >
                  <RotateCcw size={11} />
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Filter Expanded Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden mb-8"
              >
                <div className="bg-[#111] border border-white/8 rounded-xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Brand */}
                  <div>
                    <label className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                      Make / Brand
                    </label>
                    <select
                      value={filters.brand}
                      onChange={(e) => setFilterKey("brand", e.target.value)}
                      className="w-full bg-white/4 border border-white/8 text-xs text-white rounded-md p-2 focus:outline-none focus:border-white/20"
                    >
                      <option value="" className="bg-zinc-900">All Brands</option>
                      {BRANDS.map((b) => (
                        <option key={b} value={b} className="bg-zinc-900">{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Fuel */}
                  <div>
                    <label className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                      Fuel Type
                    </label>
                    <select
                      value={filters.fuel}
                      onChange={(e) => setFilterKey("fuel", e.target.value)}
                      className="w-full bg-white/4 border border-white/8 text-xs text-white rounded-md p-2 focus:outline-none focus:border-white/20"
                    >
                      <option value="" className="bg-zinc-900">All Fuel Types</option>
                      {FUEL_TYPES.map((f) => (
                        <option key={f} value={f} className="bg-zinc-900">{f}</option>
                      ))}
                    </select>
                  </div>

                  {/* Transmission */}
                  <div>
                    <label className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                      Transmission
                    </label>
                    <select
                      value={filters.transmission}
                      onChange={(e) => setFilterKey("transmission", e.target.value)}
                      className="w-full bg-white/4 border border-white/8 text-xs text-white rounded-md p-2 focus:outline-none focus:border-white/20"
                    >
                      <option value="" className="bg-zinc-900">All Transmissions</option>
                      {TRANSMISSION_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-zinc-900">{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Body Type */}
                  <div>
                    <label className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                      Body Type
                    </label>
                    <select
                      value={filters.bodyType}
                      onChange={(e) => setFilterKey("bodyType", e.target.value)}
                      className="w-full bg-white/4 border border-white/8 text-xs text-white rounded-md p-2 focus:outline-none focus:border-white/20"
                    >
                      <option value="" className="bg-zinc-900">All Body Styles</option>
                      {BODY_TYPES.map((b) => (
                        <option key={b} value={b} className="bg-zinc-900">{b}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cars grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-[#111] border border-white/6 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Search size={22} className="text-white/40" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No cars matched your criteria.</h3>
              <p className="text-xs text-white/40 max-w-sm mx-auto mb-6">
                Try searching for another keyword or clearing active filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 bg-white text-black text-xs font-semibold px-5 py-2.5 rounded-md hover:bg-white/90 transition-all"
              >
                <RotateCcw size={13} />
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {paginated.map((car, i) => (
                  <CarCard key={car.id} car={car} index={i} />
                ))}
              </div>

              {/* KEEP LOAD MORE CARS UI INTACT FOR FUTURE INVENTORY EXPANSION */}
              <div className="flex flex-col items-center justify-center pt-4 pb-8 border-t border-white/5">
                <button
                  onClick={() => {
                    if (hasMore) setPage((p) => p + 1);
                  }}
                  disabled={!hasMore}
                  className={cn(
                    "inline-flex items-center gap-2 border text-xs px-8 py-3.5 rounded-xl transition-all duration-200",
                    hasMore
                      ? "border-white/20 text-white hover:border-white/40 hover:bg-white/5 cursor-pointer"
                      : "border-white/8 text-white/30 cursor-default bg-white/2"
                  )}
                >
                  <span>Load More Cars</span>
                  <ChevronDown size={14} className={hasMore ? "text-white" : "text-white/20"} />
                </button>
                <p className="text-[11px] text-white/25 mt-3">
                  Showing {paginated.length} of {filtered.length} listing{filtered.length === 1 ? "" : "s"}
                </p>
              </div>
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
