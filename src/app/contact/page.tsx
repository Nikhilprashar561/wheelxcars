import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | WheelxCars",
  description: "Get in touch with WheelxCars. Book a test drive, enquire about a vehicle, or visit our showroom.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-20 sm:pt-28 w-full max-w-full overflow-x-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 mb-4">
          <p className="text-[11px] text-white/30 uppercase tracking-[0.18em] font-semibold mb-3">
            — Contact
          </p>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
