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
  PhoneCall,
  MessageCircle,
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

const WHATSAPP_NUMBER = "918054535453";
const PHONE_DISPLAY = "+91 80545 35453";
const PHONE_TEL = "tel:+918054535453";

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
    message: `Hi, I am interested in the ${car.year} ${car.brand} ${car.model} (${car.variant}). Please share the inspection report, price details, and availability.`,
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

  const openWhatsAppTestDrive = (date?: string, slot?: string, notes?: string) => {
    const text = `📅 *TEST DRIVE BOOKING — WheelxCars*\n\n` +
      `🚗 *Vehicle:* ${car.year} ${car.brand} ${car.model} (${car.variant})\n` +
      `💰 *Price:* ${formatPrice(car.price)}\n` +
      `📍 *Registration:* ${car.registration}\n` +
      `${date ? `📅 *Preferred Date:* ${date}\n` : ""}` +
      `${slot ? `⏰ *Time Slot:* ${slot}\n` : ""}` +
      `${notes ? `📝 *Note:* ${notes}\n` : ""}\n` +
      `Hi WheelxCars, I would like to book a Test Drive for this car in Tricity. Please let me know available slots.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const openWhatsAppEnquiry = (customMsg?: string) => {
    const text = `🚗 *VEHICLE ENQUIRY — WheelxCars*\n\n` +
      `• *Vehicle:* ${car.year} ${car.brand} ${car.model} (${car.variant})\n` +
      `• *Asking Price:* ${formatPrice(car.price)}\n` +
      `• *Registration:* ${car.registration} (${car.registrationPlace || "Tricity"})\n\n` +
      `${customMsg ? `💬 *Message:* ${customMsg}\n\n` : ""}` +
      `Hi WheelxCars, I am interested in this car. Please share complete inspection details, price breakdown & availability.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone) {
      setEnquiryError("Please provide your name and contact phone number.");
      return;
    }
    setEnquiryError(null);
    setEnquiryLoading(true);

    try {
      // 1. Asynchronously post to lead API
      fetch("/api/send-email", {
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
      }).catch(console.error);

      // 2. Open WhatsApp directly with full enquiry queries
      const whatsappText = `🚗 *VEHICLE ENQUIRY — WheelxCars*\n\n` +
        `• *Car:* ${car.year} ${car.brand} ${car.model} (${car.variant})\n` +
        `• *Asking Price:* ${formatPrice(car.price)}\n` +
        `• *Reg / Loc:* ${car.registration} (${car.registrationPlace || "Tricity"})\n\n` +
        `👤 *Client Details:*\n` +
        `• *Name:* ${enquiryForm.name}\n` +
        `• *Phone:* ${enquiryForm.phone}\n` +
        `${enquiryForm.email ? `• *Email:* ${enquiryForm.email}\n` : ""}` +
        `• *Query / Message:* ${enquiryForm.message || "Please share inspection report, availability & pricing."}`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`, "_blank");
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
      fetch("/api/send-email", {
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
      }).catch(console.error);

      const whatsappText = `📅 *TEST DRIVE BOOKING — WheelxCars*\n\n` +
        `• *Car:* ${car.year} ${car.brand} ${car.model} (${car.variant})\n` +
        `• *Reg:* ${car.registration}\n\n` +
        `👤 *Appointment Details:*\n` +
        `• *Name:* ${testDriveForm.name}\n` +
        `• *Phone:* ${testDriveForm.phone}\n` +
        `• *Preferred Date:* ${testDriveForm.preferredDate}\n` +
        `• *Time Slot:* ${testDriveForm.preferredTime}\n` +
        `${testDriveForm.message ? `• *Location / Notes:* ${testDriveForm.message}\n` : ""}\n` +
        `Please confirm test drive schedule.`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`, "_blank");
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
    { label: "Ownership", value: car.owners || "Verified", icon: Users },
    { label: "Color", value: car.color || "N/A", icon: Palette },
    { label: "Registration", value: car.registrationPlace || car.registration, icon: MapPin },
    ...(car.location ? [{ label: "Location", value: car.location, icon: MapPin }] : []),
    ...(car.makeMonth ? [{ label: "Make Month", value: car.makeMonth, icon: Calendar }] : []),
    ...(car.postingDate ? [{ label: "Posted On", value: car.postingDate, icon: Calendar }] : []),
    ...(car.insuranceType ? [{ label: "Insurance", value: car.insuranceType, icon: FileText }] : []),
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-20 sm:pt-24 pb-28 px-3.5 sm:px-6 w-full max-w-full overflow-x-hidden">
        <div className="max-w-[1360px] mx-auto w-full min-w-0">
          {/* Back link & breadcrumb */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-2">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Inventory
            </Link>
            <div className="flex items-center gap-2 text-xs text-white/30 truncate max-w-full">
              <span>Inventory</span>
              <span>/</span>
              <span>{car.brand}</span>
              <span>/</span>
              <span className="text-white/60 truncate">{car.model}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 lg:gap-10 w-full min-w-0">
            {/* Left: Gallery & Vehicle Specs */}
            <div className="w-full min-w-0 overflow-hidden">
              {/* Main image */}
              <div
                className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[#141414] mb-3 cursor-zoom-in group border border-white/8 shadow-2xl w-full"
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
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 flex-wrap pointer-events-none">
                  <div className="bg-black/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10 shrink-0">
                    {car.year} Model
                  </div>
                  <div className="bg-black/85 backdrop-blur-md text-white/90 text-[10px] font-medium px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shrink-0">
                    <ShieldCheck size={12} className="text-white" />
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
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                      }}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white/90 text-[10px] sm:text-xs px-2.5 py-1 rounded-md border border-white/10">
                  {activeIndex + 1} / {car.images.length} · Tap to enlarge
                </div>
              </div>

              {/* Thumbnails */}
              {car.images.length > 1 && (
                <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-10 overflow-x-auto pb-2 scrollbar-none w-full max-w-full">
                  {car.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={cn(
                        "relative w-20 sm:w-28 h-14 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200",
                        i === activeIndex
                          ? "border-white shadow-xl scale-[1.02]"
                          : "border-transparent opacity-50 hover:opacity-80"
                      )}
                    >
                      <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="(max-width: 640px) 80px, 112px" />
                    </button>
                  ))}
                </div>
              )}

              {/* Key Details Table Section */}
              <div className="mb-6 sm:mb-10 bg-[#111] border border-white/8 rounded-2xl p-4 sm:p-6 md:p-8 w-full min-w-0 overflow-hidden">
                <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-4 sm:mb-6 flex items-center gap-2">
                  <FileText size={16} className="text-white/60 shrink-0" />
                  Key Vehicle Details
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4 w-full min-w-0">
                  {keySpecs.map((spec) => {
                    const Icon = spec.icon;
                    return (
                      <div
                        key={spec.label}
                        className="bg-white/3 border border-white/6 rounded-xl p-3 sm:p-4 flex flex-col justify-between gap-1.5 min-w-0 overflow-hidden"
                      >
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                          <Icon size={13} className="text-white/40" />
                        </div>
                        <div className="min-w-0 w-full overflow-hidden">
                          <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold truncate">
                            {spec.label}
                          </p>
                          <p className="text-xs sm:text-sm font-bold text-white mt-0.5 break-words line-clamp-2 leading-tight">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Grouped Features UI */}
              {car.featuresList && (
                <div className="mb-6 sm:mb-10 space-y-4 sm:space-y-6 w-full min-w-0">
                  <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                    Equipment &amp; Features Breakdown
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 w-full min-w-0">
                    {car.featuresList.map((group) => (
                      <div
                        key={group.category}
                        className="bg-[#111] border border-white/8 rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 w-full min-w-0 overflow-hidden"
                      >
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest text-white/80 border-b border-white/6 pb-2 truncate">
                          {group.category}
                        </h3>
                        <div className="space-y-2 text-xs">
                          {group.items.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-start justify-between gap-2 py-1 min-w-0"
                            >
                              <span className="text-white/70 flex items-center gap-2 min-w-0 break-words leading-tight">
                                <CheckCircle size={13} className="text-white/80 shrink-0 mt-0.5" />
                                <span className="break-words">{item.name}</span>
                              </span>
                              <span className="font-semibold text-white shrink-0 text-right">
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
                <div className="mb-8 bg-[#111] border border-white/8 rounded-2xl p-4 sm:p-6 md:p-8 w-full min-w-0 overflow-hidden">
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                    Listing Overview
                  </h2>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed break-words">
                    {car.description}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Sticky Action & Pricing Panel */}
            <div className="w-full min-w-0 lg:sticky lg:top-28 self-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-[#111] border border-white/10 rounded-2xl p-5 sm:p-7 space-y-5 sm:space-y-6 shadow-2xl w-full min-w-0 overflow-hidden"
              >
                {/* Vehicle title */}
                <div className="min-w-0">
                  <span className="text-xs text-white/40 uppercase tracking-widest font-semibold">
                    {car.year} • {car.brand}
                  </span>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mt-1 break-words">
                    {car.brand} {car.model}
                  </h1>
                  <p className="text-xs sm:text-sm text-white/50 mt-1 break-words">{car.variant}</p>
                </div>

                {/* Price Section */}
                <div className="border-t border-b border-white/6 py-4 sm:py-5 min-w-0">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                    Fixed Transparent Price
                  </p>
                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mt-1">
                    <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {car.price ? formatPrice(car.price) : (car.priceText || "Price on Request")}
                    </p>
                    {car.emi && (
                      <span className="text-[11px] sm:text-xs font-semibold text-white/80 bg-white/10 px-2.5 py-0.5 sm:py-1 rounded-full border border-white/10">
                        EMI from {formatEMI(car.emi)}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-white/40 mt-1.5 leading-relaxed">
                    Includes verified RC transfer, comprehensive inspection &amp; zero hidden commissions.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setEnquiryModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2.5 bg-white text-black font-bold text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl hover:bg-white/90 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl cursor-pointer"
                  >
                    <MessageSquare size={16} />
                    Enquire About This Vehicle
                  </button>
                  <button
                    onClick={() => openWhatsAppTestDrive()}
                    className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl cursor-pointer"
                  >
                    <MessageCircle size={17} />
                    Book a Test Drive (WhatsApp)
                  </button>
                  <a
                    href="tel:+918054535453"
                    className="w-full flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold text-xs sm:text-sm py-3.5 rounded-xl hover:border-white/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <PhoneCall size={15} className="text-emerald-400" />
                    Call Directly: +91 80545 35453
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0c]/95 backdrop-blur-lg border-t border-white/10 p-2.5 sm:p-3 flex items-center gap-2 shadow-2xl">
        <a
          href="tel:+918054535453"
          className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs py-3 rounded-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all text-center"
        >
          <PhoneCall size={14} className="text-emerald-400 shrink-0" />
          <span>Call</span>
        </a>
        <button
          onClick={() => openWhatsAppTestDrive()}
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <MessageCircle size={14} className="shrink-0" />
          <span>Test Drive</span>
        </button>
        <button
          onClick={() => setEnquiryModalOpen(true)}
          className="flex-1 bg-white text-black font-bold text-xs py-3 rounded-lg text-center active:scale-95 transition-all"
        >
          <span>Enquire</span>
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
                  <CheckCircle size={48} className="text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Enquiry Sent to WhatsApp</h3>
                  <p className="text-xs text-white/50 max-w-xs mx-auto">
                    We have received your enquiry for the {car.year} {car.brand} {car.model} and opened WhatsApp to connect you directly.
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
                  <div className="mb-5">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                      Vehicle Enquiry
                    </p>
                    <h2 className="text-xl font-bold text-white mt-1">
                      {car.year} {car.brand} {car.model}
                    </h2>
                    <p className="text-xs text-white/50">{car.variant} • {car.mileage} • {car.color}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openWhatsAppEnquiry()}
                    className="w-full mb-4 flex items-center justify-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold py-3 rounded-xl transition-all"
                  >
                    <MessageCircle size={16} />
                    Instant Query on WhatsApp: +91 80545 35453
                  </button>

                  <div className="relative flex items-center justify-center mb-4">
                    <span className="h-px bg-white/10 w-full" />
                    <span className="px-3 text-[10px] text-white/30 uppercase bg-[#121212] shrink-0">or fill details</span>
                    <span className="h-px bg-white/10 w-full" />
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
                          placeholder="+91 80545 35453"
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
                      className="w-full bg-white text-black font-bold text-xs py-3.5 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle size={15} />
                      {enquiryLoading ? "Submitting..." : "Send Vehicle Enquiry via WhatsApp"}
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
                  <CheckCircle size={48} className="text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Test Drive Requested</h3>
                  <p className="text-xs text-white/50 max-w-xs mx-auto">
                    Your test drive appointment for the {car.year} {car.brand} {car.model} has been sent to WhatsApp. Our advisor will confirm your slot.
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
                  <div className="mb-5">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                      Schedule Appointment
                    </p>
                    <h2 className="text-xl font-bold text-white mt-1">
                      {car.year} {car.brand} {car.model}
                    </h2>
                    <p className="text-xs text-white/50">{car.variant} • Reg: {car.registration}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openWhatsAppTestDrive()}
                    className="w-full mb-4 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-lg"
                  >
                    <MessageCircle size={16} />
                    Quick WhatsApp Booking: +91 80545 35453
                  </button>

                  <div className="relative flex items-center justify-center mb-4">
                    <span className="h-px bg-white/10 w-full" />
                    <span className="px-3 text-[10px] text-white/30 uppercase bg-[#121212] shrink-0">or select slot details</span>
                    <span className="h-px bg-white/10 w-full" />
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
                          placeholder="+91 80545 35453"
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
                      className="w-full bg-white text-black font-bold text-xs py-3.5 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle size={15} />
                      {testDriveLoading ? "Scheduling..." : "Confirm Test Drive on WhatsApp"}
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
