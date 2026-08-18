"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, Search, MapPin, RotateCcw, ShieldCheck } from "lucide-react";
import { CARS, BRANDS, FUEL_TYPES, TRANSMISSION_TYPES, BODY_TYPES, LOCATIONS, TricityLocation, Car } from "@/lib/data";
import { CarCard } from "@/components/CarCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { label: "Newest Model Year", value: "year-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Lowest Mileage", value: "mileage-asc" },
];

const BUDGET_OPTIONS = [
  { label: "Under ₹4 Lakh", min: 0, max: 4 },
  { label: "₹4 – ₹6 Lakh", min: 4, max: 6 },
  { label: "₹6 – ₹8 Lakh", min: 6, max: 8 },
  { label: "₹8 – ₹10 Lakh", min: 8, max: 10 },
];

interface FilterState {
  q: string;
  location: string;
  brand: string;
  fuel: string;
  transmission: string;
  bodyType: string;
  budget: string;
  owners: string;
}

function CarsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sort, setSort] = useState("year-desc");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const CARS_PER_PAGE = 8;

  const [filters, setFilters] = useState<FilterState>({
    q: searchParams.get("q") || "",
    location: searchParams.get("location") || "",
    brand: searchParams.get("brand") || "",
    fuel: searchParams.get("fuel") || "",
    transmission: searchParams.get("transmission") || "",
    bodyType: searchParams.get("bodyType") || "",
    budget: searchParams.get("budget") || "",
    owners: searchParams.get("owners") || "",
  });

  // Sync state if URL searchParams changes externally
  useEffect(() => {
    setFilters({
      q: searchParams.get("q") || "",
      location: searchParams.get("location") || "",
      brand: searchParams.get("brand") || "",
      fuel: searchParams.get("fuel") || "",
      transmission: searchParams.get("transmission") || "",
      bodyType: searchParams.get("bodyType") || "",
      budget: searchParams.get("budget") || "",
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
      location: "",
      brand: "",
      fuel: "",
      transmission: "",
      bodyType: "",
      budget: "",
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
          c.city.toLowerCase().includes(qLower) ||
          c.locality.toLowerCase().includes(qLower) ||
          c.description.toLowerCase().includes(qLower)
      );
    }

    // Location
    if (filters.location) {
      result = result.filter((c) => c.city.toLowerCase() === filters.location.toLowerCase());
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

    // Owners
    if (filters.owners) {
      const oNum = parseInt(filters.owners, 10);
      if (!isNaN(oNum)) {
        result = result.filter((c) => c.owners === oNum);
      }
    }

    // Budget
    if (filters.budget) {
      const foundBudget = BUDGET_OPTIONS.find((b) => b.label === filters.budget);
      if (foundBudget) {
        result = result.filter((c) => c.price >= foundBudget.min && c.price <= foundBudget.max);
      }
    }

    // Sorting
    if (sort === "year-desc") {
      result.sort((a, b) => b.year - a.year);
    } else if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "mileage-asc") {
      result.sort((a, b) => (a.kmDriven || 0) - (b.kmDriven || 0));
    }

    return result;
  }, [filters, sort]);

  const paginated = filtered.slice(0, page * CARS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-28 pb-24 px-4 sm:px-6">
        <div className="max-w-[1360px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-[11px] text-white/40 uppercase tracking-[0.18em] font-semibold mb-2">
                <MapPin size={12} className="text-white/60" />
                <span>Chandigarh · Mohali · Panchkula · Zirakpur · Kharar</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em] text-white mb-2">
                Explore Verified Inventory.
              </h1>
              <p className="text-sm text-white/40">
                Showing {filtered.length} inspected pre-owned cars priced under ₹10 Lakh in the Tricity area.
              </p>
            </motion.div>

            {/* Quick Location Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/8 rounded-lg overflow-x-auto">
              <button
                onClick={() => setFilterKey("location", "")}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap",
                  filters.location === ""
                    ? "bg-white text-black font-semibold"
                    : "text-white/50 hover:text-white"
                )}
              >
                All Tricity
              </button>
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setFilterKey("location", filters.location === loc ? "" : loc)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap",
                    filters.location === loc
                      ? "bg-white text-black font-semibold"
                      : "text-white/50 hover:text-white"
                  )}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar & Controls row */}
          <div className="bg-[#111] border border-white/8 rounded-xl p-4 mb-6 space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Keyword Search */}
              <div className="relative flex-1 w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={filters.q}
                  onChange={(e) => setFilterKey("q", e.target.value)}
                  placeholder="Search by make, model, variant, or area (e.g. Creta, Thar, Sector 18)..."
                  className="w-full bg-white/4 border border-white/8 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
                />
                {filters.q && (
                  <button
                    onClick={() => setFilterKey("q", "")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
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
                    "inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg border transition-all",
                    showFilters
                      ? "bg-white text-black border-white"
                      : "border-white/10 text-white/70 hover:border-white/25 hover:text-white"
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
                    className="appearance-none bg-white/4 border border-white/10 text-white/70 hover:text-white text-xs rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:border-white/25 transition-colors cursor-pointer"
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
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-white/5">
                <span className="text-[11px] text-white/30 uppercase tracking-wider font-semibold">Active:</span>
                {filters.location && (
                  <button
                    onClick={() => setFilterKey("location", "")}
                    className="inline-flex items-center gap-1.5 text-xs bg-white/8 hover:bg-white/12 text-white px-2.5 py-1 rounded-md transition-colors"
                  >
                    📍 {filters.location} <X size={11} />
                  </button>
                )}
                {filters.brand && (
                  <button
                    onClick={() => setFilterKey("brand", "")}
                    className="inline-flex items-center gap-1.5 text-xs bg-white/8 hover:bg-white/12 text-white px-2.5 py-1 rounded-md transition-colors"
                  >
                    Brand: {filters.brand} <X size={11} />
                  </button>
                )}
                {filters.budget && (
                  <button
                    onClick={() => setFilterKey("budget", "")}
                    className="inline-flex items-center gap-1.5 text-xs bg-white/8 hover:bg-white/12 text-white px-2.5 py-1 rounded-md transition-colors"
                  >
                    💰 {filters.budget} <X size={11} />
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
                {filters.owners && (
                  <button
                    onClick={() => setFilterKey("owners", "")}
                    className="inline-flex items-center gap-1.5 text-xs bg-white/8 hover:bg-white/12 text-white px-2.5 py-1 rounded-md transition-colors"
                  >
                    {filters.owners} Owner <X size={11} />
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
                <div className="bg-[#111] border border-white/8 rounded-xl p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {/* Location */}
                  <div>
                    <label className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                      Tricity City
                    </label>
                    <select
                      value={filters.location}
                      onChange={(e) => setFilterKey("location", e.target.value)}
                      className="w-full bg-white/4 border border-white/8 text-xs text-white rounded-md p-2 focus:outline-none focus:border-white/20"
                    >
                      <option value="" className="bg-zinc-900">All Cities</option>
                      {LOCATIONS.map((l) => (
                        <option key={l} value={l} className="bg-zinc-900">{l}</option>
                      ))}
                    </select>
                  </div>

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

                  {/* Budget */}
                  <div>
                    <label className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                      Budget (Max ₹10L)
                    </label>
                    <select
                      value={filters.budget}
                      onChange={(e) => setFilterKey("budget", e.target.value)}
                      className="w-full bg-white/4 border border-white/8 text-xs text-white rounded-md p-2 focus:outline-none focus:border-white/20"
                    >
                      <option value="" className="bg-zinc-900">Any Budget</option>
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b.label} value={b.label} className="bg-zinc-900">{b.label}</option>
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

                  {/* Ownership */}
                  <div>
                    <label className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                      Ownership
                    </label>
                    <select
                      value={filters.owners}
                      onChange={(e) => setFilterKey("owners", e.target.value)}
                      className="w-full bg-white/4 border border-white/8 text-xs text-white rounded-md p-2 focus:outline-none focus:border-white/20"
                    >
                      <option value="" className="bg-zinc-900">Any Ownership</option>
                      <option value="1" className="bg-zinc-900">1st Owner Only</option>
                      <option value="2" className="bg-zinc-900">2nd Owner</option>
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
                Try widening your price range, searching for another model, or clearing active filters across Chandigarh &amp; Tricity.
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

              {hasMore && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="inline-flex items-center gap-2 border border-white/15 text-white font-medium text-xs px-8 py-3 rounded-lg hover:border-white/35 hover:bg-white/5 transition-all duration-200"
                  >
                    Load More Cars ({filtered.length - paginated.length} remaining)
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
