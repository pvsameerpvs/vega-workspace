"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Mail, Phone, MessageCircle } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/data";

export function Navbar() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
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
          isHome ? (isTransparent ? "bg-transparent" : "bg-gray-900") : "bg-gray-900"
        } ${isHome && scrolled ? "hidden" : "block"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-5 text-xs">
            <a
              href="mailto:Sales@thevegauae.com"
              className={`flex items-center gap-1.5 transition-colors hover:text-white ${
                isTransparent ? "text-white/60" : "text-white/60"
              }`}
            >
              <Mail className="h-3 w-3" />
              <span className="hidden sm:inline">Sales@thevegauae.com</span>
            </a>
            <a
              href="tel:+971567351095"
              className={`flex items-center gap-1.5 transition-colors hover:text-white ${
                isTransparent ? "text-white/60" : "text-white/60"
              }`}
            >
              <Phone className="h-3 w-3" />
              <span>+971 56 735 1095</span>
            </a>
            <a
              href="https://wa.me/971567351095"
              target="_blank"
              className={`flex items-center gap-1.5 transition-colors hover:text-white ${
                isTransparent ? "text-white/60" : "text-white/60"
              }`}
            >
              <MessageCircle className="h-3 w-3" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-white/90 font-medium">EN</span>
            <span className="text-white/30">|</span>
            <Link href="/ar" className="text-white/60 hover:text-white transition-colors">
              AR
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div
        className={`transition-all duration-500 ${
          isTransparent
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${
                isTransparent ? "text-white" : "text-gray-900"
              }`}
            >
              VEGA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm transition-colors duration-300 ${
                isTransparent ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setActiveMega("products")}
              onMouseLeave={() => setActiveMega(null)}
            >
              <button
                className={`flex items-center gap-1 text-sm transition-colors duration-300 ${
                  isTransparent ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Products
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {activeMega === "products" && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
                  <div className="w-[680px] rounded-2xl bg-white p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] border border-gray-100">
                    <div className="grid grid-cols-4 gap-5">
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <div key={cat.id}>
                          <Link
                            href={`/products/${cat.slug}`}
                            className="block text-sm font-semibold text-gray-900 mb-2 hover:text-gray-600"
                          >
                            {cat.name}
                          </Link>
                          <ul className="space-y-1.5">
                            {cat.subcategories.slice(0, 4).map((sub) => (
                              <li key={sub}>
                                <span className="text-xs text-gray-400">{sub}</span>
                              </li>
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
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className={`text-sm transition-colors duration-300 ${
                  isTransparent ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact-us"
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                isTransparent
                  ? "border border-white/30 text-white hover:bg-white hover:text-gray-900"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden rounded-lg p-2 transition-colors ${
              isTransparent ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col p-6 space-y-1">
            <Link href="/" className="py-3 text-sm text-gray-900 font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
            <div className="border-t border-gray-100 py-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Products</span>
              <div className="space-y-2 ml-2">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <Link key={cat.id} href={`/products/${cat.slug}`} className="block text-sm text-gray-600" onClick={() => setMobileOpen(false)}>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            {["About Us", "Careers", "Blog", "Gallery", "Catalog", "Contact Us"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="border-t border-gray-100 py-3 text-sm text-gray-600" onClick={() => setMobileOpen(false)}>
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
