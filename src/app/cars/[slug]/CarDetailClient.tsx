"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Fuel,
  Settings2,
  MapPin,
  Gauge,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  CalendarCheck,
  Palette,
  FileText,
  ShieldAlert,
  Sparkles,
  Radio,
  Navigation,
} from "lucide-react";
import { CARS, formatPrice, formatEMI, Car } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

interface CarDetailClientProps {
  slug: string;
}

export function CarDetailClient({ slug }: CarDetailClientProps) {
  const car = CARS.find((c) => c.slug === slug);
  if (!car) return notFound();

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Modals state
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);

  // Enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferredContact: "Phone & WhatsApp",
    message: `Hi, I am interested in the ${car.year} ${car.brand} ${car.model} (${car.variant}). Please share the asking price, inspection report, and availability.`,
  });
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryError, setEnquiryError] = useState<string | null>(null);

  // Test Drive form state
  const [testDriveForm, setTestDriveForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "11:00 AM - 01:00 PM (Morning)",
    message: "",
  });
  const [testDriveLoading, setTestDriveLoading] = useState(false);
  const [testDriveSuccess, setTestDriveSuccess] = useState(false);
  const [testDriveError, setTestDriveError] = useState<string | null>(null);

  const goNext = () => setActiveIndex((i) => (i + 1) % car.images.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + car.images.length) % car.images.length);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone) {
      setEnquiryError("Please provide your name and contact phone number.");
      return;
    }
    setEnquiryError(null);
    setEnquiryLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "car-enquiry",
          data: {
            ...enquiryForm,
            car: {
              id: car.id,
              brand: car.brand,
              model: car.model,
              variant: car.variant,
              year: car.year,
              price: car.price || car.priceText || "Price on Request",
              fuel: car.fuel,
              transmission: car.transmission,
              mileage: car.mileage,
              registration: car.registration,
              color: car.color,
            },
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to send enquiry");
      setEnquirySuccess(true);
    } catch (err) {
      console.error(err);
      setEnquiryError("Failed to submit enquiry. Please try calling us directly.");
    } finally {
      setEnquiryLoading(false);
    }
  };

  const handleTestDriveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testDriveForm.name || !testDriveForm.phone || !testDriveForm.preferredDate) {
      setTestDriveError("Please complete all required fields including preferred date.");
      return;
    }
    setTestDriveError(null);
    setTestDriveLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "test-drive",
          data: {
            ...testDriveForm,
            car: {
              id: car.id,
              brand: car.brand,
              model: car.model,
              variant: car.variant,
              year: car.year,
              registration: car.registration,
            },
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to submit test drive request");
      setTestDriveSuccess(true);
    } catch (err) {
      console.error(err);
      setTestDriveError("Failed to submit test drive request. Please contact us directly.");
    } finally {
      setTestDriveLoading(false);
    }
  };

  const keySpecs = [
    { label: "Year", value: car.year.toString(), icon: Calendar },
    { label: "Variant", value: car.variant, icon: Settings2 },
    { label: "Fuel", value: car.fuel, icon: Fuel },
    { label: "Mileage", value: car.mileage, icon: Gauge },
    { label: "Transmission", value: car.transmission, icon: Settings2 },
    { label: "Ownership", value: car.owners || "1st Owner", icon: Users },
    { label: "Color", value: car.color || "Green", icon: Palette },
    { label: "Registration Place", value: car.registrationPlace || car.registration, icon: MapPin },
    { label: "Make Month", value: car.makeMonth || "September", icon: Calendar },
    { label: "Insurance", value: car.insuranceType || "Comprehensive", icon: FileText },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24 pb-28 px-4 sm:px-6">
        <div className="max-w-[1360px] mx-auto">
          {/* Back link & breadcrumb */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Inventory
            </Link>
            <div className="flex items-center gap-2 text-xs text-white/30">
              <span>Inventory</span>
              <span>/</span>
              <span>{car.brand}</span>
              <span>/</span>
              <span className="text-white/60">{car.model}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-10">
            {/* Left: Gallery & Vehicle Specs */}
            <div>
              {/* Main image */}
              <div
                className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[#141414] mb-3 cursor-zoom-in group border border-white/8 shadow-2xl"
                onClick={() => setLightboxOpen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={car.images[activeIndex]}
                      alt={`${car.brand} ${car.model} - Image ${activeIndex + 1}`}
                      fill
                      className="object-cover object-center"
                      priority
                      quality={95}
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="bg-black/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10">
                    {car.year} Model
                  </div>
                  <div className="bg-black/85 backdrop-blur-md text-white/90 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-white" />
                    Verified Vehicle
                  </div>
                </div>

                {/* Nav arrows */}
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goPrev();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white/90 text-xs px-3 py-1 rounded-md border border-white/10">
                  {activeIndex + 1} / {car.images.length} · Click to enlarge
                </div>
              </div>

              {/* Thumbnails */}
              {car.images.length > 1 && (
                <div className="flex gap-3 mb-10 overflow-x-auto pb-1">
                  {car.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={cn(
                        "relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200",
                        i === activeIndex
                          ? "border-white shadow-xl scale-[1.03]"
                          : "border-transparent opacity-50 hover:opacity-80"
                      )}
                    >
                      <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="112px" />
                    </button>
                  ))}
                </div>
              )}

              {/* Key Details Table Section */}
              <div className="mb-10 bg-[#111] border border-white/8 rounded-2xl p-6 sm:p-8">
                <h2 className="text-base font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <FileText size={16} className="text-white/60" />
                  Key Vehicle Details
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {keySpecs.map((spec) => {
                    const Icon = spec.icon;
                    return (
                      <div
                        key={spec.label}
                        className="bg-white/3 border border-white/6 rounded-xl p-4 flex flex-col justify-between gap-1.5"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                          <Icon size={14} className="text-white/40" />
                        </div>
                        <div>
                          <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">
                            {spec.label}
                          </p>
                          <p className="text-sm font-bold text-white mt-0.5">{spec.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Grouped Features UI */}
              {car.featuresList && (
                <div className="mb-10 space-y-6">
                  <h2 className="text-base font-bold text-white uppercase tracking-wider">
                    Equipment &amp; Features Breakdown
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {car.featuresList.map((group) => (
                      <div
                        key={group.category}
                        className="bg-[#111] border border-white/8 rounded-2xl p-6 space-y-4"
                      >
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest text-white/80 border-b border-white/6 pb-2">
                          {group.category}
                        </h3>
                        <div className="space-y-2.5">
                          {group.items.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-center justify-between text-xs py-1"
                            >
                              <span className="text-white/70 flex items-center gap-2">
                                <CheckCircle size={13} className="text-white/80" />
                                {item.name}
                              </span>
                              <span className="font-semibold text-white">
                                {typeof item.value === "string" ? item.value : "Yes"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {car.description && (
                <div className="mb-8 bg-[#111] border border-white/8 rounded-2xl p-6 sm:p-8">
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                    Listing Overview
                  </h2>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {car.description}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Sticky Action & Pricing Panel */}
            <div className="lg:sticky lg:top-28 self-start">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-[#111] border border-white/10 rounded-2xl p-7 space-y-6 shadow-2xl"
              >
                {/* Vehicle title */}
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-widest font-semibold">
                    {car.year} • {car.brand}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mt-1">
                    {car.brand} {car.model}
                  </h1>
                  <p className="text-sm text-white/50 mt-1">{car.variant}</p>
                </div>

                {/* Price Section */}
                <div className="border-t border-b border-white/6 py-5">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                    Price
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                    {car.price ? formatPrice(car.price) : (car.priceText || "Price on Request")}
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    Contact us for competitive pricing &amp; direct seller evaluation.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setEnquiryModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2.5 bg-white text-black font-bold text-sm py-4 rounded-xl hover:bg-white/90 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl"
                  >
                    <MessageSquare size={16} />
                    Enquire About This Vehicle
                  </button>
                  <button
                    onClick={() => setTestDriveModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2.5 border border-white/20 text-white font-semibold text-sm py-3.5 rounded-xl hover:border-white/40 hover:bg-white/5 transition-all"
                  >
                    <CalendarCheck size={16} />
                    Book a Test Drive
                  </button>
                  <a
                    href="tel:+919876543210"
                    className="w-full flex items-center justify-center gap-2 border border-white/10 text-white/60 text-xs py-3 rounded-xl hover:text-white hover:border-white/25 transition-all"
                  >
                    <Phone size={13} />
                    Direct Phone: +91 98765 43210
                  </a>
                </div>

                {/* Verified Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-white/6 text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-white/80 flex-shrink-0" />
                    <span>1st Hand Single-Owner Vehicle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-white/80 flex-shrink-0" />
                    <span>Comprehensive Insurance Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-white/80 flex-shrink-0" />
                    <span>Complete Verification &amp; Inspection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-white/80 flex-shrink-0" />
                    <span>Hassle-free Documentation &amp; Transfer</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0c]/95 backdrop-blur-lg border-t border-white/10 p-3 flex items-center gap-3 shadow-2xl">
        <div className="flex-1">
          <p className="text-sm font-bold text-white">{car.brand} {car.model}</p>
          <p className="text-[10px] text-white/40">{car.price ? formatPrice(car.price) : "Price on Request"}</p>
        </div>
        <button
          onClick={() => setEnquiryModalOpen(true)}
          className="flex-1 bg-white text-black font-bold text-xs py-3 rounded-lg hover:bg-white/90 text-center"
        >
          Enquire
        </button>
        <button
          onClick={() => setTestDriveModalOpen(true)}
          className="flex-1 border border-white/20 text-white font-medium text-xs py-3 rounded-lg text-center"
        >
          Test Drive
        </button>
      </div>

      {/* ENQUIRY MODAL */}
      <AnimatePresence>
        {enquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#121212] border border-white/12 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setEnquiryModalOpen(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {enquirySuccess ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle size={48} className="text-white/90 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Enquiry Submitted</h3>
                  <p className="text-xs text-white/50 max-w-xs mx-auto">
                    We have received your enquiry for the {car.year} {car.brand} {car.model}. Our team will contact you shortly with price details.
                  </p>
                  <button
                    onClick={() => {
                      setEnquirySuccess(false);
                      setEnquiryModalOpen(false);
                    }}
                    className="mt-4 bg-white text-black text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-white/90"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                      Vehicle Enquiry
                    </p>
                    <h2 className="text-xl font-bold text-white mt-1">
                      {car.year} {car.brand} {car.model}
                    </h2>
                    <p className="text-xs text-white/50">{car.variant} • {car.mileage} • {car.color}</p>
                  </div>

                  {enquiryError && (
                    <div className="mb-4 p-3 bg-red-950/40 border border-red-900 text-red-300 text-xs rounded flex items-center gap-2">
                      <AlertCircle size={14} />
                      {enquiryError}
                    </div>
                  )}

                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={enquiryForm.name}
                        onChange={(e) => setEnquiryForm((s) => ({ ...s, name: e.target.value }))}
                        placeholder="Full Name"
                        className="w-full bg-white/4 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={enquiryForm.phone}
                          onChange={(e) => setEnquiryForm((s) => ({ ...s, phone: e.target.value }))}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white/4 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={enquiryForm.email}
                          onChange={(e) => setEnquiryForm((s) => ({ ...s, email: e.target.value }))}
                          placeholder="you@domain.com"
                          className="w-full bg-white/4 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                        Message / Request
                      </label>
                      <textarea
                        rows={3}
                        value={enquiryForm.message}
                        onChange={(e) => setEnquiryForm((s) => ({ ...s, message: e.target.value }))}
                        className="w-full bg-white/4 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={enquiryLoading}
                      className="w-full bg-white text-black font-bold text-xs py-3.5 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                    >
                      {enquiryLoading ? "Submitting..." : "Send Vehicle Enquiry"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TEST DRIVE MODAL */}
      <AnimatePresence>
        {testDriveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#121212] border border-white/12 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setTestDriveModalOpen(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {testDriveSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle size={48} className="text-white/90 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Test Drive Scheduled</h3>
                  <p className="text-xs text-white/50 max-w-xs mx-auto">
                    Your test drive request for the {car.year} {car.brand} {car.model} has been recorded. Our advisor will confirm appointment time &amp; venue.
                  </p>
                  <button
                    onClick={() => {
                      setTestDriveSuccess(false);
                      setTestDriveModalOpen(false);
                    }}
                    className="mt-4 bg-white text-black text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-white/90"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                      Schedule Appointment
                    </p>
                    <h2 className="text-xl font-bold text-white mt-1">
                      {car.year} {car.brand} {car.model}
                    </h2>
                    <p className="text-xs text-white/50">{car.variant} • Reg: {car.registration}</p>
                  </div>

                  {testDriveError && (
                    <div className="mb-4 p-3 bg-red-950/40 border border-red-900 text-red-300 text-xs rounded flex items-center gap-2">
                      <AlertCircle size={14} />
                      {testDriveError}
                    </div>
                  )}

                  <form onSubmit={handleTestDriveSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={testDriveForm.name}
                        onChange={(e) => setTestDriveForm((s) => ({ ...s, name: e.target.value }))}
                        placeholder="Full Name"
                        className="w-full bg-white/4 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={testDriveForm.phone}
                          onChange={(e) => setTestDriveForm((s) => ({ ...s, phone: e.target.value }))}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white/4 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={testDriveForm.email}
                          onChange={(e) => setTestDriveForm((s) => ({ ...s, email: e.target.value }))}
                          placeholder="you@domain.com"
                          className="w-full bg-white/4 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={testDriveForm.preferredDate}
                          onChange={(e) => setTestDriveForm((s) => ({ ...s, preferredDate: e.target.value }))}
                          className="w-full bg-white/4 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                          Time Slot *
                        </label>
                        <select
                          value={testDriveForm.preferredTime}
                          onChange={(e) => setTestDriveForm((s) => ({ ...s, preferredTime: e.target.value }))}
                          className="w-full bg-white/4 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/30"
                        >
                          <option value="10:00 AM - 12:00 PM" className="bg-zinc-900">10:00 AM - 12:00 PM (Morning)</option>
                          <option value="12:00 PM - 03:00 PM" className="bg-zinc-900">12:00 PM - 03:00 PM (Afternoon)</option>
                          <option value="03:00 PM - 06:30 PM" className="bg-zinc-900">03:00 PM - 06:30 PM (Evening)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                        Location / Notes
                      </label>
                      <textarea
                        rows={2}
                        value={testDriveForm.message}
                        onChange={(e) => setTestDriveForm((s) => ({ ...s, message: e.target.value }))}
                        placeholder="Any special requests or location preference..."
                        className="w-full bg-white/4 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={testDriveLoading}
                      className="w-full bg-white text-black font-bold text-xs py-3.5 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                    >
                      {testDriveLoading ? "Scheduling..." : "Confirm Test Drive Request"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close image viewer"
            >
              <X size={24} />
            </button>
            <div className="relative w-full max-w-5xl aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={car.images[activeIndex]}
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {car.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
