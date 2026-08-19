"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Car as CarIcon,
  BadgeDollarSign,
  Clock,
  UploadCloud,
  X,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  MapPin,
} from "lucide-react";
import { BRANDS, FUEL_TYPES, TRANSMISSION_TYPES, BODY_TYPES, LOCATIONS } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SellFormData {
  // Step 1: Vehicle
  make: string;
  model: string;
  variant: string;
  year: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;

  // Step 2: Usage
  kmDriven: string;
  owners: string;
  regState: string;
  regCity: string;

  // Step 3: Condition
  overallCondition: string;
  accidentHistory: string;
  serviceHistory: string;
  insuranceStatus: string;
  mechanicalIssues: string;

  // Step 4: Pricing
  expectedPrice: string; // in Lakhs
  isNegotiable: boolean;

  // Step 5: Photos
  photos: string[];

  // Step 6: Seller
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  sellerCity: string;
  sellerLocality: string;
}

const initialData: SellFormData = {
  make: "",
  model: "",
  variant: "",
  year: 2020,
  fuelType: "Petrol",
  transmission: "Manual",
  bodyType: "SUV",
  color: "",
  kmDriven: "",
  owners: "1",
  regState: "CH (Chandigarh)",
  regCity: "Chandigarh",
  overallCondition: "Excellent — Minor normal wear",
  accidentHistory: "Zero Accidents / All Original Panels",
  serviceHistory: "Complete Authorized Dealership Records",
  insuranceStatus: "Comprehensive (Active)",
  mechanicalIssues: "None, runs perfectly",
  expectedPrice: "",
  isNegotiable: true,
  photos: [],
  sellerName: "",
  sellerPhone: "",
  sellerEmail: "",
  sellerCity: "Chandigarh",
  sellerLocality: "",
};

export default function SellYourCarPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<SellFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!form.make.trim()) newErrors.make = "Make / Brand is required";
      if (!form.model.trim()) newErrors.model = "Model name is required";
      if (!form.year || form.year < 2005 || form.year > 2026) newErrors.year = "Enter a valid manufacturing year";
    }

    if (currentStep === 2) {
      if (!form.kmDriven.trim()) newErrors.kmDriven = "Total KMs driven is required";
      if (!form.regCity.trim()) newErrors.regCity = "Registration city is required";
    }

    if (currentStep === 4) {
      if (!form.expectedPrice || isNaN(parseFloat(form.expectedPrice)) || parseFloat(form.expectedPrice) <= 0) {
        newErrors.expectedPrice = "Enter your expected price in Lakhs (e.g. 5.5)";
      }
    }

    if (currentStep === 6) {
      if (!form.sellerName.trim()) newErrors.sellerName = "Full name is required";
      if (!form.sellerPhone.trim() || form.sellerPhone.length < 10) newErrors.sellerPhone = "Valid 10-digit phone number is required";
      if (!form.sellerEmail.trim() || !form.sellerEmail.includes("@")) newErrors.sellerEmail = "Valid email is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 7));
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newUrls = files.slice(0, 8).map((f) => URL.createObjectURL(f));
      setForm((s) => ({ ...s, photos: [...s.photos, ...newUrls].slice(0, 10) }));
    }
  };

  const removePhoto = (idx: number) => {
    setForm((s) => ({ ...s, photos: s.photos.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async () => {
    if (!validateStep(6)) {
      setStep(6);
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sell-car",
          data: {
            ...form,
            imageCount: form.photos.length,
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to submit listing");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Submission error. Please verify your details or call our support line.");
    } finally {
      setLoading(false);
    }
  };

  const stepsList = [
    { num: 1, label: "Vehicle" },
    { num: 2, label: "Usage" },
    { num: 3, label: "Condition" },
    { num: 4, label: "Pricing" },
    { num: 5, label: "Photos" },
    { num: 6, label: "Contact" },
    { num: 7, label: "Review" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-20 sm:pt-28 pb-24 px-3.5 sm:px-6 w-full max-w-full overflow-x-hidden">
        <div className="max-w-[1080px] mx-auto w-full min-w-0">
          {/* Hero Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <div className="flex items-center gap-2 text-[11px] text-white/40 uppercase tracking-[0.18em] font-semibold mb-3">
              <MapPin size={12} className="text-white/60 shrink-0" />
              <span className="truncate">Chandigarh · Mohali · Panchkula · Zirakpur · Kharar</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-[-0.025em] text-white mb-3">
              Sell Your Car in Tricity.
            </h1>
            <p className="text-xs sm:text-sm text-white/45 max-w-xl leading-relaxed">
              Get an honest market valuation and sell your car directly to serious buyers across Chandigarh &amp; Tricity. Transparent, fast, and free of dealer commission.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
            {[
              {
                icon: BadgeDollarSign,
                title: "Accurate Tricity Pricing",
                desc: "Real-time market valuation tailored to Chandigarh (CH), Punjab (PB) & Haryana (HR) vehicles.",
              },
              {
                icon: Clock,
                title: "Quick 48-Hour Sale",
                desc: "Direct connection with verified pre-qualified buyers in your locality.",
              },
              {
                icon: ShieldCheck,
                title: "RC Transfer Handled",
                desc: "End-to-end documentation assistance at RTO Chandigarh, Mohali, or Panchkula.",
              },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="bg-[#111] border border-white/6 rounded-xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-white/50" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white mb-0.5 sm:mb-1">{b.title}</h3>
                    <p className="text-[11px] text-white/35 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wizard Card */}
          <div className="bg-[#111] border border-white/8 rounded-2xl p-4 sm:p-6 md:p-10 shadow-2xl w-full min-w-0 overflow-hidden">
            {submitted ? (
              <div className="py-16 text-center space-y-5 max-w-md mx-auto">
                <CheckCircle size={52} className="text-white/80 mx-auto" />
                <h2 className="text-2xl font-bold text-white">Listing Submitted Successfully</h2>
                <p className="text-sm text-white/50 leading-relaxed">
                  Thank you, <strong>{form.sellerName}</strong>. Our Tricity vehicle inspection team has received the details for your <strong>{form.year} {form.make} {form.model}</strong>. We will review and reach out within 24 hours.
                </p>
                <div className="p-4 bg-white/4 border border-white/8 rounded-xl text-left text-xs text-white/60 space-y-1.5">
                  <p>📍 Location: {form.sellerCity}, {form.sellerLocality || "Tricity"}</p>
                  <p>💰 Expected Price: ₹{form.expectedPrice} Lakh</p>
                  <p>📞 Contact: {form.sellerPhone}</p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStep(1);
                    setForm(initialData);
                  }}
                  className="bg-white text-black text-xs font-semibold px-7 py-3 rounded-lg hover:bg-white/90 transition-all"
                >
                  Submit Another Vehicle
                </button>
              </div>
            ) : (
              <>
                {/* Step indicator bar */}
                <div className="mb-8 pb-6 border-b border-white/6">
                  <div className="flex items-center justify-between overflow-x-auto gap-2 pb-2">
                    {stepsList.map((s) => (
                      <button
                        key={s.num}
                        onClick={() => s.num < step && setStep(s.num)}
                        disabled={s.num > step}
                        className={cn(
                          "flex items-center gap-2 text-xs font-semibold whitespace-nowrap transition-all",
                          step === s.num
                            ? "text-white"
                            : s.num < step
                            ? "text-white/60 hover:text-white cursor-pointer"
                            : "text-white/20 cursor-not-allowed"
                        )}
                      >
                        <span
                          className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-[10px]",
                            step === s.num
                              ? "bg-white text-black font-bold"
                              : s.num < step
                              ? "bg-white/10 text-white"
                              : "bg-white/4 text-white/30"
                          )}
                        >
                          {s.num}
                        </span>
                        <span>{s.label}</span>
                        {s.num < 7 && <span className="text-white/10">→</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* STEP 1: VEHICLE INFORMATION */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h2 className="text-lg font-bold text-white">Step 1: Vehicle Information</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Make / Brand *
                        </label>
                        <input
                          type="text"
                          value={form.make}
                          onChange={(e) => setForm((s) => ({ ...s, make: e.target.value }))}
                          placeholder="e.g. Maruti Suzuki, Hyundai, Toyota"
                          className="w-full bg-[#181818] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                        />
                        {errors.make && <p className="text-red-400 text-xs mt-1">{errors.make}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Model Name *
                        </label>
                        <input
                          type="text"
                          value={form.model}
                          onChange={(e) => setForm((s) => ({ ...s, model: e.target.value }))}
                          placeholder="e.g. Swift, Creta, Fortuner, Thar"
                          className="w-full bg-[#181818] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                        />
                        {errors.model && <p className="text-red-400 text-xs mt-1">{errors.model}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Variant
                        </label>
                        <input
                          type="text"
                          value={form.variant}
                          onChange={(e) => setForm((s) => ({ ...s, variant: e.target.value }))}
                          placeholder="e.g. VXI, SX Opt, 4x4 AT"
                          className="w-full bg-[#181818] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Manufacturing Year *
                        </label>
                        <input
                          type="number"
                          value={form.year}
                          onChange={(e) => setForm((s) => ({ ...s, year: parseInt(e.target.value, 10) || 2020 }))}
                          className="w-full bg-white/4 border border-white/8 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white/25"
                        />
                        {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Color
                        </label>
                        <input
                          type="text"
                          value={form.color}
                          onChange={(e) => setForm((s) => ({ ...s, color: e.target.value }))}
                          placeholder="e.g. Polar White, Silver"
                          className="w-full bg-[#181818] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Fuel Type
                        </label>
                        <select
                          value={form.fuelType}
                          onChange={(e) => setForm((s) => ({ ...s, fuelType: e.target.value }))}
                          className="w-full bg-white/4 border border-white/8 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/25"
                        >
                          {FUEL_TYPES.map((f) => (
                            <option key={f} value={f} className="bg-zinc-900">{f}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Transmission
                        </label>
                        <select
                          value={form.transmission}
                          onChange={(e) => setForm((s) => ({ ...s, transmission: e.target.value }))}
                          className="w-full bg-white/4 border border-white/8 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/25"
                        >
                          {TRANSMISSION_TYPES.map((t) => (
                            <option key={t} value={t} className="bg-zinc-900">{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Body Type
                        </label>
                        <select
                          value={form.bodyType}
                          onChange={(e) => setForm((s) => ({ ...s, bodyType: e.target.value }))}
                          className="w-full bg-white/4 border border-white/8 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/25"
                        >
                          {BODY_TYPES.map((b) => (
                            <option key={b} value={b} className="bg-zinc-900">{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: USAGE & REGISTRATION */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h2 className="text-lg font-bold text-white">Step 2: Usage &amp; Registration</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Kilometres Driven *
                        </label>
                        <input
                          type="text"
                          value={form.kmDriven}
                          onChange={(e) => setForm((s) => ({ ...s, kmDriven: e.target.value }))}
                          placeholder="e.g. 45,000 km"
                          className="w-full bg-[#181818] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                        />
                        {errors.kmDriven && <p className="text-red-400 text-xs mt-1">{errors.kmDriven}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Number of Owners *
                        </label>
                        <select
                          value={form.owners}
                          onChange={(e) => setForm((s) => ({ ...s, owners: e.target.value }))}
                          className="w-full bg-white/4 border border-white/8 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/25"
                        >
                          <option value="1" className="bg-zinc-900">1st Owner (Single Hand)</option>
                          <option value="2" className="bg-zinc-900">2nd Owner</option>
                          <option value="3" className="bg-zinc-900">3rd Owner</option>
                          <option value="4+" className="bg-zinc-900">4+ Owners</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Registration RTO / State
                        </label>
                        <select
                          value={form.regState}
                          onChange={(e) => setForm((s) => ({ ...s, regState: e.target.value }))}
                          className="w-full bg-white/4 border border-white/8 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/25"
                        >
                          <option value="CH01 (Chandigarh)" className="bg-zinc-900">CH01 (Chandigarh RTO)</option>
                          <option value="PB65 (Mohali)" className="bg-zinc-900">PB65 (Mohali RTO)</option>
                          <option value="HR70 (Panchkula)" className="bg-zinc-900">HR70 (Panchkula RTO)</option>
                          <option value="PB (Punjab Other)" className="bg-zinc-900">PB (Punjab Other)</option>
                          <option value="HR (Haryana Other)" className="bg-zinc-900">HR (Haryana Other)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Registered City *
                        </label>
                        <input
                          type="text"
                          value={form.regCity}
                          onChange={(e) => setForm((s) => ({ ...s, regCity: e.target.value }))}
                          placeholder="e.g. Chandigarh, Mohali, Panchkula"
                          className="w-full bg-[#181818] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                        />
                        {errors.regCity && <p className="text-red-400 text-xs mt-1">{errors.regCity}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: CONDITION */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h2 className="text-lg font-bold text-white">Step 3: Vehicle Condition</h2>
                    <div>
                      <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                        Overall Physical &amp; Mechanical Condition
                      </label>
                      <select
                        value={form.overallCondition}
                        onChange={(e) => setForm((s) => ({ ...s, overallCondition: e.target.value }))}
                        className="w-full bg-white/4 border border-white/8 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/25"
                      >
                        <option value="Showroom Pristine — Zero scratches, flawless" className="bg-zinc-900">Showroom Pristine — Zero scratches, flawless</option>
                        <option value="Excellent — Minor normal wear" className="bg-zinc-900">Excellent — Minor normal wear</option>
                        <option value="Good — Well maintained, minor bumper touchup" className="bg-zinc-900">Good — Well maintained, minor bumper touchup</option>
                        <option value="Fair — Requires minor service or cosmetic fix" className="bg-zinc-900">Fair — Requires minor service or cosmetic fix</option>
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Accident History
                        </label>
                        <select
                          value={form.accidentHistory}
                          onChange={(e) => setForm((s) => ({ ...s, accidentHistory: e.target.value }))}
                          className="w-full bg-white/4 border border-white/8 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/25"
                        >
                          <option value="Zero Accidents / All Original Panels" className="bg-zinc-900">Zero Accidents / All Original Panels</option>
                          <option value="Minor Bumper Paint (No structural damage)" className="bg-zinc-900">Minor Bumper Paint (No structural damage)</option>
                          <option value="Repaired Door / Fender" className="bg-zinc-900">Repaired Door / Fender</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Service History
                        </label>
                        <select
                          value={form.serviceHistory}
                          onChange={(e) => setForm((s) => ({ ...s, serviceHistory: e.target.value }))}
                          className="w-full bg-white/4 border border-white/8 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/25"
                        >
                          <option value="Complete Authorized Dealership Records" className="bg-zinc-900">Complete Authorized Dealership Records</option>
                          <option value="Partially Authorized / Independent Garage" className="bg-zinc-900">Partially Authorized / Independent Garage</option>
                          <option value="Self / Local Mechanic Maintained" className="bg-zinc-900">Self / Local Mechanic Maintained</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                        Insurance Status
                      </label>
                      <select
                        value={form.insuranceStatus}
                        onChange={(e) => setForm((s) => ({ ...s, insuranceStatus: e.target.value }))}
                        className="w-full bg-white/4 border border-white/8 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/25"
                      >
                        <option value="Comprehensive Zero-Dep (Active)" className="bg-zinc-900">Comprehensive Zero-Dep (Active)</option>
                        <option value="Standard Comprehensive (Active)" className="bg-zinc-900">Standard Comprehensive (Active)</option>
                        <option value="Third Party Only" className="bg-zinc-900">Third Party Only</option>
                        <option value="Expired / Needs Renewal" className="bg-zinc-900">Expired / Needs Renewal</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: PRICING */}
                {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h2 className="text-lg font-bold text-white">Step 4: Expected Selling Price</h2>
                    <div>
                      <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                        Expected Price in Lakhs (INR) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-white/40 font-bold">₹</span>
                        <input
                          type="number"
                          step="0.05"
                          value={form.expectedPrice}
                          onChange={(e) => setForm((s) => ({ ...s, expectedPrice: e.target.value }))}
                          placeholder="e.g. 6.75"
                          className="w-full bg-white/4 border border-white/8 rounded-lg pl-8 pr-16 py-3 text-lg font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-white/25"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-white/40">Lakh</span>
                      </div>
                      {errors.expectedPrice && <p className="text-red-400 text-xs mt-1">{errors.expectedPrice}</p>}
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/4 border border-white/6 rounded-xl">
                      <input
                        type="checkbox"
                        id="negotiable"
                        checked={form.isNegotiable}
                        onChange={(e) => setForm((s) => ({ ...s, isNegotiable: e.target.checked }))}
                        className="w-4 h-4 rounded border-white/20 bg-black accent-white cursor-pointer"
                      />
                      <label htmlFor="negotiable" className="text-xs text-white/70 cursor-pointer">
                        I am open to reasonable price negotiations with genuine buyers in Tricity.
                      </label>
                    </div>

                    <div className="p-4 bg-white/2 border border-white/5 rounded-xl">
                      <p className="text-[11px] text-white/40 leading-relaxed">
                        💡 <strong>Pricing Tip:</strong> Realistic market-aligned prices in Chandigarh and Mohali typically close within 48 to 72 hours of listing.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: PHOTOS */}
                {step === 5 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-white">Step 5: Vehicle Photos</h2>
                      <p className="text-xs text-white/40 mt-0.5">
                        Add clear photos of the exterior, interior, and odometer for faster buyer enquiries.
                      </p>
                    </div>

                    {/* Upload Dropzone */}
                    <label className="border-2 border-dashed border-white/15 hover:border-white/30 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white/2 hover:bg-white/4">
                      <UploadCloud size={32} className="text-white/40 mb-3" />
                      <p className="text-xs font-semibold text-white">Click or drag photos here to upload</p>
                      <p className="text-[11px] text-white/30 mt-1">Supports JPG, PNG up to 10 photos</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Previews */}
                    {form.photos.length > 0 && (
                      <div>
                        <p className="text-xs text-white/60 mb-3">{form.photos.length} photo(s) selected:</p>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                          {form.photos.map((src, i) => (
                            <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900 border border-white/10 group">
                              <img src={src} alt="Uploaded car" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removePhoto(i)}
                                className="absolute top-1 right-1 w-5 h-5 bg-black/80 rounded-full flex items-center justify-center text-white/70 hover:text-white"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 6: CONTACT INFORMATION */}
                {step === 6 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h2 className="text-lg font-bold text-white">Step 6: Seller Contact Details</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={form.sellerName}
                          onChange={(e) => setForm((s) => ({ ...s, sellerName: e.target.value }))}
                          placeholder="e.g. Navjot Singh"
                          className="w-full bg-[#181818] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                        />
                        {errors.sellerName && <p className="text-red-400 text-xs mt-1">{errors.sellerName}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          value={form.sellerPhone}
                          onChange={(e) => setForm((s) => ({ ...s, sellerPhone: e.target.value }))}
                          placeholder="+91 80545 35453"
                          className="w-full bg-[#181818] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                        />
                        {errors.sellerPhone && <p className="text-red-400 text-xs mt-1">{errors.sellerPhone}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={form.sellerEmail}
                          onChange={(e) => setForm((s) => ({ ...s, sellerEmail: e.target.value }))}
                          placeholder="you@domain.com"
                          className="w-full bg-[#181818] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                        />
                        {errors.sellerEmail && <p className="text-red-400 text-xs mt-1">{errors.sellerEmail}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          City (Tricity) *
                        </label>
                        <select
                          value={form.sellerCity}
                          onChange={(e) => setForm((s) => ({ ...s, sellerCity: e.target.value }))}
                          className="w-full bg-white/4 border border-white/8 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/25"
                        >
                          {LOCATIONS.map((loc) => (
                            <option key={loc} value={loc} className="bg-zinc-900">{loc}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] text-zinc-300 uppercase tracking-wider font-bold mb-1.5">
                          Locality / Sector
                        </label>
                        <input
                          type="text"
                          value={form.sellerLocality}
                          onChange={(e) => setForm((s) => ({ ...s, sellerLocality: e.target.value }))}
                          placeholder="e.g. Sector 35, Phase 7, VIP Road"
                          className="w-full bg-[#181818] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 7: REVIEW & CONFIRM */}
                {step === 7 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h2 className="text-lg font-bold text-white">Step 7: Review &amp; Confirm Submission</h2>

                    <div className="bg-white/4 border border-white/8 rounded-xl p-5 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/6">
                        <div>
                          <p className="text-lg font-bold text-white">{form.year} {form.make} {form.model}</p>
                          <p className="text-xs text-white/50">{form.variant} · {form.fuelType} · {form.transmission}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-white">₹{form.expectedPrice} Lakh</p>
                          <p className="text-[10px] text-white/40">{form.isNegotiable ? "Negotiable" : "Fixed"}</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-white/30 block mb-0.5">KMs Driven:</span>
                          <span className="font-semibold text-white">{form.kmDriven}</span>
                        </div>
                        <div>
                          <span className="text-white/30 block mb-0.5">Registration:</span>
                          <span className="font-semibold text-white">{form.regState} ({form.regCity})</span>
                        </div>
                        <div>
                          <span className="text-white/30 block mb-0.5">Condition:</span>
                          <span className="font-semibold text-white">{form.overallCondition.split("—")[0]}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/6 text-xs flex justify-between items-center text-white/60">
                        <span>Seller: <strong>{form.sellerName}</strong> ({form.sellerPhone})</span>
                        <span>Location: <strong>{form.sellerCity}</strong></span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/6">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white px-4 py-2.5 rounded-lg border border-white/10 hover:border-white/25 transition-all"
                    >
                      <ArrowLeft size={13} />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 7 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 bg-white text-black text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-white/90 transition-all hover:scale-[1.01]"
                    >
                      Continue
                      <ArrowRight size={13} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-8 py-3 rounded-lg hover:bg-white/90 transition-all hover:scale-[1.02] shadow-xl"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>
                          <FileCheck size={14} />
                          Submit Car For Valuation
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
