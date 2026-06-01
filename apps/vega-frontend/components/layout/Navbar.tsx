"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Mail, Phone, MessageCircle, Star } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/data";

export function Navbar() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div
        className={`transition-all duration-500 ${
          isHome ? (isTransparent ? "bg-transparent" : "bg-vega-blue/95 backdrop-blur-md") : "bg-vega-blue/95 backdrop-blur-md"
        } ${isHome && scrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
          <div className="flex items-center gap-5 text-xs">
            <a href="mailto:Sales@thevegauae.com" className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
              <Mail className="h-3 w-3" />
              <span className="hidden sm:inline">Sales@thevegauae.com</span>
            </a>
            <a href="tel:+971567351095" className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
              <Phone className="h-3 w-3" />
              <span>+971 56 735 1095</span>
            </a>
            <a href="https://wa.me/971567351095" target="_blank" className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
              <MessageCircle className="h-3 w-3" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <div className="flex items-center gap-1.5">
              {/* UAE Flag SVG */}
              <svg
                viewBox="0 0 300 150"
                className="h-4 w-6 rounded-[2px] shadow-sm"
                aria-label="UAE Flag"
              >
                <rect x="0" y="0" width="75" height="150" fill="#FF0000" />
                <rect x="75" y="0" width="225" height="50" fill="#00732F" />
                <rect x="75" y="50" width="225" height="50" fill="#FFFFFF" />
                <rect x="75" y="100" width="225" height="50" fill="#000000" />
              </svg>
              <span className="hidden sm:inline text-white/70 font-semibold text-[10px] uppercase tracking-wider">Proud of UAE</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-white/90 font-semibold">EN</span>
            <span className="text-white/20">|</span>
            <Link href="/ar" className="text-white/50 hover:text-white transition-colors">AR</Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div
        className={`transition-all duration-500 ${
          isTransparent
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-xl border-b border-slate-100/80 shadow-subtle"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 font-heading ${isTransparent ? "text-white" : "text-vega-blue"}`}>
              VEGA
            </span>
            <Star className="h-4 w-4 fill-vega-yellow text-vega-yellow" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className={`text-sm font-semibold transition-colors duration-300 ${isTransparent ? "text-white/80 hover:text-white" : "text-slate-500 hover:text-vega-blue"}`}>
              Home
            </Link>
            <div className="relative" onMouseEnter={() => setActiveMega("products")} onMouseLeave={() => setActiveMega(null)}>
              <button className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-300 ${isTransparent ? "text-white/80 hover:text-white" : "text-slate-500 hover:text-vega-blue"}`}>
                Products <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300" />
              </button>
              {activeMega === "products" && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                  <div className="w-[720px] rounded-2xl bg-white p-6 shadow-elevated border border-slate-100 animate-scale-in origin-top">
                    <div className="grid grid-cols-4 gap-5">
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <div key={cat.id}>
                          <Link href={`/products/${cat.slug}`} className="block text-sm font-bold text-vega-blue mb-2 hover:text-vega-blue-light transition-colors">
                            {cat.name}
                          </Link>
                          <ul className="space-y-1.5">
                            {cat.subcategories.slice(0, 4).map((sub) => (
                              <li key={sub}><span className="text-xs text-slate-400">{sub}</span></li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {["About Us", "Careers", "Blog", "Gallery", "Catalog"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className={`text-sm font-semibold transition-colors duration-300 ${isTransparent ? "text-white/80 hover:text-white" : "text-slate-500 hover:text-vega-blue"}`}>
                {item}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact-us"
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                isTransparent
                  ? "bg-vega-yellow text-vega-blue hover:bg-white hover:shadow-md hover:-translate-y-0.5"
                  : "bg-vega-yellow text-vega-blue hover:bg-vega-yellow-dark hover:shadow-yellow hover:-translate-y-0.5"
              }`}>
              Contact Us
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden rounded-lg p-2 transition-colors ${isTransparent ? "text-white hover:bg-white/10" : "text-vega-blue hover:bg-slate-100"}`}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-lg animate-fade-in">
          <nav className="flex flex-col p-6 space-y-1">
            <Link href="/" className="py-3 text-sm font-bold text-vega-blue" onClick={() => setMobileOpen(false)}>Home</Link>
            <div className="border-t border-slate-100 py-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Products</span>
              <div className="space-y-2 ml-2">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <Link key={cat.id} href={`/products/${cat.slug}`} className="block text-sm text-slate-600" onClick={() => setMobileOpen(false)}>{cat.name}</Link>
                ))}
              </div>
            </div>
            {["About Us", "Careers", "Blog", "Gallery", "Catalog", "Contact Us"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="border-t border-slate-100 py-3 text-sm font-semibold text-slate-600" onClick={() => setMobileOpen(false)}>
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
