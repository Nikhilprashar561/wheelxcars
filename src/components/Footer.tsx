import Link from "next/link";
import { Share2, MessageCircle, Briefcase, Play } from "lucide-react";

const navColumns = [
  {
    title: "Navigate",
    links: [
      { label: "Home", href: "/" },
      { label: "Cars", href: "/cars" },
      { label: "Sell Your Car", href: "/sell-your-car" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const socials = [
  { icon: Share2, label: "Instagram", href: "#" },
  { icon: MessageCircle, label: "Twitter", href: "#" },
  { icon: Briefcase, label: "LinkedIn", href: "#" },
  { icon: Play, label: "YouTube", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8 px-4" role="contentinfo">
      <div className="max-w-[1360px] mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 pb-12 border-b border-white/5">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold tracking-[-0.02em] text-white">
                Wheel<span className="text-white/50">x</span>Cars
              </span>
            </Link>
            <p className="text-sm text-white/35 leading-relaxed">
              A premium pre-owned car marketplace built for the discerning buyer. 
              Every vehicle selected, inspected, and presented with transparency.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all duration-200"
                  >
                    <Icon size={13} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.title}>
              <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.15em] mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} WheelxCars. All rights reserved.
          </p>
          <p className="text-xs text-white/15 tracking-wide italic">
            Built for better car buying.
          </p>
        </div>
      </div>
    </footer>
  );
}
