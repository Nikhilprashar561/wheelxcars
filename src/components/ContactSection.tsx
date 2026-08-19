"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: Phone,
    label: "Direct Phone / Dialpad",
    value: "+91 80545 35453",
    href: "tel:+918054535453",
  },
  {
    icon: Mail,
    label: "Email Support",
    value: "hello@wheelxcars.com",
    href: "mailto:hello@wheelxcars.com",
  },
  {
    icon: MapPin,
    label: "Tricity Hub",
    value: "Industrial Area Phase 2, Chandigarh · Serving Mohali, Panchkula, Zirakpur & Kharar",
    href: "#",
  },
  {
    icon: Clock,
    label: "Operating Hours",
    value: "Mon–Sat: 9:30 AM – 7:30 PM · Sunday: By Appointment",
    href: null,
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "general-contact",
          data: form,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");
      setSubmitted(true);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg("Unable to send enquiry. Please contact us directly via phone.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-4" aria-labelledby="contact-heading">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] text-white/30 uppercase tracking-[0.18em] font-semibold mb-4">
              — Chandigarh · Mohali · Panchkula
            </p>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em] text-white mb-4 leading-[1.05]"
            >
              Let&apos;s Find Your
              <br />
              Next Car in Tricity.
            </h2>
            <p className="text-sm text-white/45 leading-relaxed max-w-sm mb-10">
              Have a question about a specific car, looking for a verified vehicle in Chandigarh, Mohali or Panchkula, or want to schedule a visit? Our local advisors are ready to assist.
            </p>

            {/* Contact info items */}
            <div className="space-y-5">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={15} className="text-white/40" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.12em] font-semibold mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm text-white/70 leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                );

                return item.href && item.href !== "#" ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block hover:text-white transition-colors"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-[#111] border border-white/6 rounded-xl p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4">
                <CheckCircle size={40} className="text-white/80" />
                <h3 className="text-xl font-bold text-white">Message Received</h3>
                <p className="text-sm text-white/45 max-w-xs">
                  We&apos;ve sent a notification to our team. A Tricity automotive specialist will get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
                  }}
                  className="mt-4 text-xs text-white/40 hover:text-white underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {errorMsg && (
                  <div className="p-3 rounded bg-red-950/40 border border-red-900/50 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle size={14} />
                    {errorMsg}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                      placeholder="e.g. Gurpreet Singh"
                      className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                      placeholder="you@domain.com"
                      className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                      placeholder="+91 80545 35453"
                      className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
                      placeholder="e.g. Test drive in Mohali"
                      className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                    placeholder="Tell us what car you're interested in or how we can assist..."
                    className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full flex items-center justify-center gap-2.5 bg-white text-black font-semibold text-sm py-4 rounded-md transition-all duration-200",
                    loading ? "opacity-70 cursor-not-allowed" : "hover:bg-white/90 hover:scale-[1.01] active:scale-[0.99]"
                  )}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={14} />
                      Send Enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
