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
  CreditCard,
  ShieldCheck,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  CalendarCheck,
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
    message: `Hi, I am interested in the ${car.year} ${car.brand} ${car.model} (${car.variant}) in ${car.city}. Please share availability and details.`,
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
              price: car.price,
              fuel: car.fuel,
              transmission: car.transmission,
              mileage: car.mileage,
              registration: car.registration,
              city: car.city,
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
              price: car.price,
              city: car.city,
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

  const specs = [
    { label: "Year of Make", value: car.year.toString(), icon: Calendar },
    { label: "Fuel Type", value: car.fuel, icon: Fuel },
    { label: "Transmission", value: car.transmission, icon: Settings2 },
    { label: "KMs Driven", value: car.mileage || "Verified Genuine", icon: Gauge },
    { label: "Location", value: `${car.city}, ${car.locality}`, icon: MapPin },
    { label: "Ownership", value: car.owners ? `${car.owners} Owner` : "1st Hand", icon: Users },
    { label: "Registration", value: car.registration, icon: ShieldCheck },
    { label: "Body Style", value: car.bodyType, icon: Settings2 },
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
              Back to Tricity Inventory
            </Link>
            <div className="flex items-center gap-2 text-xs text-white/30">
              <span>{car.city}</span>
              <span>/</span>
              <span>{car.brand}</span>
              <span>/</span>
              <span className="text-white/60">{car.model}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-10">
            {/* Left: Gallery & Specs */}
            <div>
              {/* Main image */}
              <div
                className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-900 mb-3 cursor-zoom-in group border border-white/6"
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
                      src={car.images[activeIndex] || "/hero.jpg"}
                      alt={`${car.brand} ${car.model} in ${car.city}`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10">
                    {car.year} Model
                  </div>
                  <div className="bg-black/80 backdrop-blur-md text-white/80 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <MapPin size={12} className="text-white/70" />
                    {car.city} ({car.locality})
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
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white/80 text-xs px-3 py-1 rounded-md border border-white/10">
                  {activeIndex + 1} / {car.images.length} Photos · Click to enlarge
                </div>
              </div>

              {/* Thumbnails */}
              {car.images.length > 1 && (
                <div className="flex gap-2.5 mb-8">
                  {car.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={cn(
                        "relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200",
                        i === activeIndex
                          ? "border-white shadow-md scale-[1.02]"
                          : "border-transparent opacity-50 hover:opacity-80"
                      )}
                    >
                      <Image src={img} alt={`Photo ${i + 1}`} fill className="object-cover" sizes="96px" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Specs Grid */}
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-white uppercase tracking-[0.12em] mb-4">
                  Vehicle Specifications
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {specs.map((spec) => {
                    const Icon = spec.icon;
                    return (
                      <div
                        key={spec.label}
                        className="bg-[#111] border border-white/6 rounded-xl p-4 flex flex-col justify-between gap-2"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                          <Icon size={14} className="text-white/40" />
                        </div>
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] font-semibold">
                            {spec.label}
                          </p>
                          <p className="text-sm font-bold text-white mt-0.5">{spec.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Features List */}
              {car.features && car.features.length > 0 && (
                <div className="mb-8 bg-[#111] border border-white/6 rounded-2xl p-6">
                  <h2 className="text-sm font-semibold text-white uppercase tracking-[0.12em] mb-4">
                    Key Features &amp; Equipment
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {car.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-white/70">
                        <CheckCircle size={14} className="text-white/60 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Seller / Listing Description */}
              <div className="mb-8 bg-[#111] border border-white/6 rounded-2xl p-6">
                <h2 className="text-sm font-semibold text-white uppercase tracking-[0.12em] mb-3">
                  Listing Description
                </h2>
                <p className="text-sm text-white/50 leading-relaxed whitespace-pre-line">
                  {car.description}
                </p>

                {/* Source attribution footer */}
                <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/30">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-white/50" />
                    <span>Market Reference: {car.source.platform} ({car.source.publishedDate || "Recent"})</span>
                  </div>
                  {car.source.listingUrl && (
                    <a
                      href={car.source.listingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-white/40 hover:text-white underline transition-colors"
                    >
                      View Source Reference <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Sticky Action & Pricing Panel */}
            <div className="lg:sticky lg:top-28 self-start">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-[#111] border border-white/8 rounded-2xl p-7 space-y-6 shadow-2xl"
              >
                {/* Vehicle title */}
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">
                    {car.year} · {car.city}
                  </span>
                  <h1 className="text-2xl font-bold text-white tracking-tight leading-tight mt-1">
                    {car.brand} {car.model}
                  </h1>
                  <p className="text-xs text-white/40 mt-1">{car.variant}</p>
                </div>

                {/* Price */}
                <div className="border-t border-b border-white/6 py-5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white tracking-tight">
                        {formatPrice(car.price)}
                      </p>
                      {car.emi && (
                        <p className="text-xs text-white/40 mt-1">
                          Estimated EMI: <span className="text-white/70 font-semibold">{formatEMI(car.emi)}</span>
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-semibold border border-white/10 px-2 py-1 rounded">
                      Under ₹10L
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                  <button
                    onClick={() => setEnquiryModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold text-sm py-3.5 rounded-lg hover:bg-white/90 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg"
                  >
                    <MessageSquare size={16} />
                    Enquire About This Car
                  </button>
                  <button
                    onClick={() => setTestDriveModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 border border-white/20 text-white font-semibold text-sm py-3.5 rounded-lg hover:border-white/40 hover:bg-white/5 transition-all"
                  >
                    <CalendarCheck size={16} />
                    Book a Test Drive in {car.city}
                  </button>
                  <a
                    href="tel:+919876543210"
                    className="w-full flex items-center justify-center gap-2 border border-white/10 text-white/60 text-xs py-3 rounded-lg hover:text-white hover:border-white/25 transition-all"
                  >
                    <Phone size={13} />
                    Direct Call: +91 98765 43210
                  </a>
                </div>

                {/* Trust points */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  {[
                    "✓ 200-Point Certified Inspection",
                    "✓ Verified Ownership & RTO Record",
                    "✓ Hassle-Free Tricity RC Transfer",
                    "✓ Instant Spot Financing Available",
                  ].map((item) => (
                    <p key={item} className="text-xs text-white/40 font-medium">
                      {item}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0c]/95 backdrop-blur-lg border-t border-white/10 p-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-sm font-bold text-white">{formatPrice(car.price)}</p>
          <p className="text-[10px] text-white/40">{car.city}</p>
        </div>
        <button
          onClick={() => setEnquiryModalOpen(true)}
          className="flex-1 bg-white text-black font-semibold text-xs py-2.5 rounded-md hover:bg-white/90 text-center"
        >
          Enquire
        </button>
        <button
          onClick={() => setTestDriveModalOpen(true)}
          className="flex-1 border border-white/20 text-white font-medium text-xs py-2.5 rounded-md text-center"
        >
          Test Drive
        </button>
      </div>

      {/* ENQUIRY MODAL */}
      <AnimatePresence>
        {enquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
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
                  <CheckCircle size={44} className="text-white/80 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Enquiry Received</h3>
                  <p className="text-xs text-white/50 max-w-xs mx-auto">
                    We&apos;ve logged your request for the {car.year} {car.brand} {car.model}. Our Tricity specialist will contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setEnquirySuccess(false);
                      setEnquiryModalOpen(false);
                    }}
                    className="mt-4 bg-white text-black text-xs font-semibold px-6 py-2.5 rounded-md hover:bg-white/90"
                  >
                    Close Window
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
                    <p className="text-xs text-white/50">{car.variant} · {car.city} · {formatPrice(car.price)}</p>
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
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={enquiryForm.name}
                        onChange={(e) => setEnquiryForm((s) => ({ ...s, name: e.target.value }))}
                        placeholder="e.g. Jaspreet Singh"
                        className="w-full bg-white/4 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
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
                          className="w-full bg-white/4 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
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
                          className="w-full bg-white/4 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                        Message / Question
                      </label>
                      <textarea
                        rows={3}
                        value={enquiryForm.message}
                        onChange={(e) => setEnquiryForm((s) => ({ ...s, message: e.target.value }))}
                        className="w-full bg-white/4 border border-white/10 rounded-md px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={enquiryLoading}
                      className="w-full bg-white text-black font-semibold text-xs py-3.5 rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                    >
                      {enquiryLoading ? "Submitting Enquiry..." : "Send Vehicle Enquiry"}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
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
                  <CheckCircle size={44} className="text-white/80 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Test Drive Requested</h3>
                  <p className="text-xs text-white/50 max-w-xs mx-auto">
                    We have received your test drive appointment for the {car.year} {car.brand} {car.model} in {car.city}. Our advisor will call to confirm location &amp; slot.
                  </p>
                  <button
                    onClick={() => {
                      setTestDriveSuccess(false);
                      setTestDriveModalOpen(false);
                    }}
                    className="mt-4 bg-white text-black text-xs font-semibold px-6 py-2.5 rounded-md hover:bg-white/90"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                      Schedule Test Drive
                    </p>
                    <h2 className="text-xl font-bold text-white mt-1">
                      {car.year} {car.brand} {car.model}
                    </h2>
                    <p className="text-xs text-white/50">Location: {car.city} ({car.locality})</p>
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
                        placeholder="e.g. Aman Verma"
                        className="w-full bg-white/4 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
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
                          className="w-full bg-white/4 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
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
                          className="w-full bg-white/4 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
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
                          className="w-full bg-white/4 border border-white/10 rounded-md px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                          Time Slot *
                        </label>
                        <select
                          value={testDriveForm.preferredTime}
                          onChange={(e) => setTestDriveForm((s) => ({ ...s, preferredTime: e.target.value }))}
                          className="w-full bg-white/4 border border-white/10 rounded-md px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/30"
                        >
                          <option value="10:00 AM - 12:00 PM" className="bg-zinc-900">10:00 AM - 12:00 PM (Morning)</option>
                          <option value="12:00 PM - 03:00 PM" className="bg-zinc-900">12:00 PM - 03:00 PM (Afternoon)</option>
                          <option value="03:00 PM - 06:30 PM" className="bg-zinc-900">03:00 PM - 06:30 PM (Evening)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                        Special Instructions / Location Preference
                      </label>
                      <textarea
                        rows={2}
                        value={testDriveForm.message}
                        onChange={(e) => setTestDriveForm((s) => ({ ...s, message: e.target.value }))}
                        placeholder="e.g. Please bring vehicle to Sector 70, Mohali"
                        className="w-full bg-white/4 border border-white/10 rounded-md px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={testDriveLoading}
                      className="w-full bg-white text-black font-semibold text-xs py-3.5 rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                    >
                      {testDriveLoading ? "Booking Appointment..." : "Confirm Test Drive Request"}
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
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
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
                src={car.images[activeIndex] || "/hero.jpg"}
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
