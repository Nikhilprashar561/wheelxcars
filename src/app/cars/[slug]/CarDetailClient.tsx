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

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goNext();
    } else if (isRightSwipe) {
      goPrev();
    }
  };

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
      <main className="min-h-screen bg-black pt-20 sm:pt-24 pb-28 px-3 sm:px-6 w-full max-w-full overflow-x-hidden">
        <div className="max-w-[1360px] mx-auto w-full min-w-0">
          {/* Back link & breadcrumb */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-2">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Inventory
            </Link>
            <div className="flex items-center gap-2 text-xs text-zinc-500 truncate max-w-full">
              <span>Inventory</span>
              <span>/</span>
              <span>{car.brand}</span>
              <span>/</span>
              <span className="text-zinc-300 truncate">{car.model}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 lg:gap-10 w-full min-w-0">
            {/* Left: Gallery & Vehicle Specs */}
            <div className="w-full min-w-0 overflow-hidden">
              {/* Main image with Touch Swipe Support */}
              <div
                className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[#141414] mb-3 cursor-zoom-in group border border-white/10 shadow-2xl w-full select-none touch-pan-y"
                onClick={() => setLightboxOpen(true)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={car.images[activeIndex]}
                      alt={`${car.brand} ${car.model} - Image ${activeIndex + 1}`}
                      fill
                      className="object-cover object-center pointer-events-none"
                      priority
                      quality={95}
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 flex-wrap pointer-events-none">
                  <div className="bg-black/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/15 shadow-md shrink-0">
                    {car.year} Model
                  </div>
                  <div className="bg-black/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/15 flex items-center gap-1.5 shadow-md shrink-0">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    Verified Vehicle
                  </div>
                </div>

                {/* Nav arrows with high z-index and tap area */}
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goPrev();
                      }}
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-black/80 hover:bg-black text-white rounded-full flex items-center justify-center border border-white/20 shadow-xl transition-all active:scale-90 cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} className="text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                      }}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-black/80 hover:bg-black text-white rounded-full flex items-center justify-center border border-white/20 shadow-xl transition-all active:scale-90 cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} className="text-white" />
                    </button>
                  </>
                )}

                {/* Mobile Pagination Dots */}
                {car.images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 pointer-events-none">
                    {car.images.map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "rounded-full transition-all duration-300",
                          i === activeIndex
                            ? "w-4 h-1.5 bg-white"
                            : "w-1.5 h-1.5 bg-white/40"
                        )}
                      />
                    ))}
                  </div>
                )}

                {/* Desktop & Tablet Counter pill */}
                <div className="hidden sm:block absolute bottom-3 right-3 z-20 bg-black/85 backdrop-blur-md text-white font-semibold text-xs px-3 py-1 rounded-md border border-white/15 shadow-lg">
                  {activeIndex + 1} / {car.images.length} · Tap to enlarge
                </div>
              </div>

              {/* Thumbnails */}
              {car.images.length > 1 && (
                <div className="flex gap-2.5 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-none w-full max-w-full">
                  {car.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={cn(
                        "relative w-20 sm:w-28 h-16 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 cursor-pointer shadow-md",
                        i === activeIndex
                          ? "border-white shadow-2xl scale-[1.03] ring-1 ring-white/50 opacity-100"
                          : "border-white/10 opacity-60 hover:opacity-100"
                      )}
                      aria-label={`View photo ${i + 1}`}
                    >
                      <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="(max-width: 640px) 80px, 112px" />
                    </button>
                  ))}
                </div>
              )}

              {/* Key Details Table Section - High Contrast */}
              <div className="mb-6 sm:mb-8 bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 w-full min-w-0 overflow-hidden shadow-xl">
                <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-4 sm:mb-6 flex items-center gap-2 border-b border-white/8 pb-3">
                  <FileText size={16} className="text-zinc-300 shrink-0" />
                  <span>Key Vehicle Details</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3.5 w-full min-w-0">
                  {keySpecs.map((spec) => {
                    const Icon = spec.icon;
                    return (
                      <div
                        key={spec.label}
                        className="bg-[#1c1c1c] border border-white/10 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between gap-2 min-w-0 overflow-hidden shadow-sm hover:border-white/20 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                          <Icon size={14} className="text-zinc-200" />
                        </div>
                        <div className="min-w-0 w-full overflow-hidden">
                          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-bold truncate">
                            {spec.label}
                          </p>
                          <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5 break-words line-clamp-2 leading-snug">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Grouped Features UI - High Contrast */}
              {car.featuresList && (
                <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6 w-full min-w-0">
                  <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                    Equipment &amp; Features Breakdown
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full min-w-0">
                    {car.featuresList.map((group) => (
                      <div
                        key={group.category}
                        className="bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3 w-full min-w-0 overflow-hidden shadow-lg"
                      >
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2.5 truncate flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span>{group.category}</span>
                        </h3>
                        <div className="space-y-2 text-xs">
                          {group.items.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-start justify-between gap-2 py-1 min-w-0 border-b border-white/5 last:border-0"
                            >
                              <span className="text-zinc-300 font-medium flex items-center gap-2 min-w-0 break-words leading-snug">
                                <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                                <span className="break-words">{item.name}</span>
                              </span>
                              <span className="font-bold text-white shrink-0 text-right">
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
                <div className="mb-8 bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 w-full min-w-0 overflow-hidden shadow-lg">
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                    Listing Overview
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed break-words font-normal">
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
                className="bg-[#141414] border border-white/12 rounded-2xl p-5 sm:p-7 space-y-5 sm:space-y-6 shadow-2xl w-full min-w-0 overflow-hidden"
              >
                {/* Vehicle title */}
                <div className="min-w-0">
                  <span className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
                    {car.year} • {car.brand}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mt-1 break-words">
                    {car.brand} {car.model}
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-1 break-words">{car.variant}</p>
                </div>

                {/* Price Section */}
                <div className="border-t border-b border-white/10 py-4 sm:py-5 min-w-0">
                  <p className="text-[11px] text-zinc-400 uppercase tracking-widest font-bold">
                    Fixed Transparent Price
                  </p>
                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mt-1.5">
                    <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {car.price ? formatPrice(car.price) : (car.priceText || "Price on Request")}
                    </p>
                    {car.emi && (
                      <span className="text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                        EMI from {formatEMI(car.emi)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    Includes verified RC transfer, comprehensive inspection &amp; zero hidden commissions.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setEnquiryModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2.5 bg-white text-black font-extrabold text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl hover:bg-zinc-100 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl cursor-pointer"
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
                    className="w-full flex items-center justify-center gap-2.5 bg-[#1c1c1c] hover:bg-[#252525] border border-white/20 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl hover:border-white/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <PhoneCall size={15} className="text-emerald-400" />
                    Call Directly: +91 80545 35453
                  </a>
                </div>

                {/* Verified Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-zinc-300 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                    <span>1st Hand Single-Owner Vehicle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                    <span>Comprehensive Insurance Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                    <span>Complete Verification &amp; Inspection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                    <span>Hassle-free Documentation &amp; Transfer</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE STICKY BOTTOM BAR - Redesigned 3 Action Buttons */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e0e]/95 backdrop-blur-xl border-t border-white/12 px-3 py-2.5 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <a
            href="tel:+918054535453"
            className="flex-1 bg-[#1c1c1c] hover:bg-[#252525] border border-white/15 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all text-center shadow-md"
            aria-label="Call Directly"
          >
            <PhoneCall size={14} className="text-emerald-400 shrink-0" />
            <span>Call</span>
          </a>
          <button
            onClick={() => openWhatsAppTestDrive()}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md cursor-pointer"
            aria-label="Book a Test Drive on WhatsApp"
          >
            <MessageCircle size={15} className="shrink-0" />
            <span>Test Drive</span>
          </button>
          <button
            onClick={() => setEnquiryModalOpen(true)}
            className="flex-1 bg-white hover:bg-zinc-100 text-black font-bold text-xs py-3 rounded-xl text-center active:scale-95 transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            aria-label="Enquire on WhatsApp"
          >
            <MessageSquare size={14} className="shrink-0" />
            <span>Enquire</span>
          </button>
        </div>
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
