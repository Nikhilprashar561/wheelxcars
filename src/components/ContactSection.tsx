"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@wheelxcars.com",
    href: "mailto:hello@wheelxcars.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "123 Auto Plaza, Connaught Place, New Delhi",
    href: "#",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat: 9 AM – 7 PM, Sun: 10 AM – 5 PM",
    href: null,
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
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
              — Get in Touch
            </p>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em] text-white mb-4 leading-[1.05]"
            >
              Let&apos;s Find Your
              <br />
              Next Car.
            </h2>
            <p className="text-sm text-white/45 leading-relaxed max-w-sm mb-10">
              Have a question, looking for a specific vehicle, or want to schedule a visit? 
              Our team is ready to help.
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
                <CheckCircle size={40} className="text-white/50" />
                <h3 className="text-xl font-bold text-white">Message Sent</h3>
                <p className="text-sm text-white/45 max-w-xs">
                  We&apos;ll get back to you within 24 hours. Thank you for reaching out.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                      placeholder="Arjun Mehta"
                      className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                      placeholder="you@email.com"
                      className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/4 border border-white/8 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-[10px] text-white/35 uppercase tracking-[0.12em] font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                    placeholder="Tell us what you're looking for..."
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
