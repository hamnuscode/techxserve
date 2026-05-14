import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Custom Software", href: "/services#custom-software" },
  { label: "Cloud & Transformation", href: "/services#cloud" },
  { label: "AI & Data Analytics", href: "/services#ai-data" },
  { label: "Automation & SaaS", href: "/services#automation" },
  { label: "Mobile & Web", href: "/services#mobile-web" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] text-white border-t border-[#1e1e1e]">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-md bg-brand-red flex items-center justify-center text-white font-black text-xs shadow-[0_2px_8px_rgba(204,0,0,0.5)]">TXS</span>
              <span className="font-bold text-[15px] tracking-tight">Tech<span className="text-brand-red">x</span>Serve</span>
            </Link>
            <p className="text-[#a1a1aa] text-xs italic mb-4">Tomorrow&apos;s Reality, Today.</p>
            <div className="flex flex-col gap-2.5">
              <a href="tel:+13072939151" className="flex items-center gap-2 text-[#a1a1aa] text-xs hover:text-white transition-colors">
                <Phone size={12} className="text-brand-red" />+1 (307) 293-9151
              </a>
              <a href="mailto:info@techxserve.com" className="flex items-center gap-2 text-[#a1a1aa] text-xs hover:text-white transition-colors">
                <Mail size={12} className="text-brand-red" />info@techxserve.com
              </a>
              <span className="flex items-start gap-2 text-[#a1a1aa] text-xs">
                <MapPin size={12} className="text-brand-red mt-0.5 shrink-0" />Sheridan, WY · Islamabad, PK
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#d4d4d8] mb-4">Company</p>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#a1a1aa] text-xs hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#d4d4d8] mb-4">Services</p>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#a1a1aa] text-xs hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + tagline */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#d4d4d8] mb-4">Connect</p>
            <div className="flex gap-2 mb-5">
              {[
                {
                  label: "LinkedIn", href: "#",
                  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
                },
                {
                  label: "GitHub", href: "#",
                  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
                },
                {
                  label: "Twitter", href: "#",
                  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-[#222] flex items-center justify-center text-[#a1a1aa] hover:text-white hover:border-brand-red/50 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="text-[#888] text-[11px] leading-relaxed">
              We build technology that works, so you can focus on building your business.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#181818]">
        <div className="max-w-[1280px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <p className="text-[#71717a] text-[11px]">© 2025 TechxServe. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="red-dot w-1.5 h-1.5" />
            <span className="text-[#71717a] text-[11px]">Live & Building</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
