"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass shadow-[0_1px_24px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group z-10">
            <span className="relative flex items-center justify-center w-8 h-8 overflow-hidden rounded-lg bg-gradient-to-br from-brand-red to-brand-red-dark text-white font-black text-xs tracking-tighter select-none shadow-[0_2px_8px_rgba(204,0,0,0.4)]">
              TXS
            </span>
            <span className="font-bold text-[17px] text-charcoal tracking-tight">
              Tech<span className="text-brand-red font-black">x</span>Serve
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-brand-red bg-brand-red/6"
                    : "text-charcoal/80 hover:text-charcoal hover:bg-charcoal/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3 z-10">
            <Link
              href="/contact"
              className="hidden md:inline-flex btn-glow items-center gap-1.5 px-4 py-2 bg-brand-red text-white text-sm font-semibold rounded-lg shadow-[0_2px_12px_rgba(204,0,0,0.35)] hover:bg-brand-red-dark hover:shadow-[0_4px_20px_rgba(204,0,0,0.45)] transition-all duration-200 hover:-translate-y-0.5"
            >
              Get a Free Consultation
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden relative z-10 w-9 h-9 rounded-lg flex items-center justify-center bg-charcoal/5 hover:bg-charcoal/10 text-charcoal transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-charcoal/30 backdrop-blur-sm" />
      </div>

      <div
        ref={menuRef}
        className={`md:hidden fixed top-0 right-0 bottom-0 z-[45] w-[300px] bg-white shadow-[-8px_0_40px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-border-gray">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-brand-red flex items-center justify-center text-white font-black text-xs">TXS</span>
            <span className="font-bold text-sm text-charcoal">Tech<span className="text-brand-red">x</span>Serve</span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-mid-gray hover:text-charcoal hover:bg-off-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col px-3 py-4 gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "bg-brand-red/8 text-brand-red"
                  : "text-charcoal hover:bg-off-white"
              }`}
            >
              {link.label}
              <ChevronRight size={15} className="opacity-40" />
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border-gray">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-red text-white text-sm font-bold rounded-xl shadow-[0_4px_16px_rgba(204,0,0,0.3)] hover:bg-brand-red-dark transition-colors"
          >
            Get a Free Consultation
          </Link>
        </div>
      </div>
    </>
  );
}
