"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Search, Phone, Mail, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

interface NavbarProps {
  categories?: { id: string; name: string; slug: string; subcategories?: string[] }[];
  products?: { id: string; name: string; slug: string; image: string; category: string }[];
}

export function Navbar({ categories = [], products = [] }: NavbarProps) {
  const [mega, setMega] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const topHidden = isHome && scrolled;

  const productsByCategory = useMemo(() => {
    const map: Record<string, typeof products> = {};
    for (const cat of categories) {
      map[cat.slug] = products
        .filter((p) =>
          p.category.toLowerCase().replace(/\s+/g, "-") === cat.slug.toLowerCase() ||
          p.category.toLowerCase() === cat.name.toLowerCase()
        )
        .slice(0, 3);
    }
    return map;
  }, [categories, products]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className={`bg-[#1F3A93] transition-all duration-500 ${topHidden ? "h-0 opacity-0 overflow-hidden" : "h-auto opacity-100"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] text-white/70">
          <div className="flex items-center gap-4">
            <a href="tel:+971567351095" className="flex items-center gap-1 hover:text-white transition-colors"><Phone className="h-3 w-3" /> +971 56 735 1095</a>
            <a href="mailto:Sales@thevegauae.com" className="hidden sm:flex items-center gap-1 hover:text-white transition-colors"><Mail className="h-3 w-3" /> Sales@thevegauae.com</a>
            <a href="https://wa.me/971567351095" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-1 hover:text-white transition-colors"><WhatsAppIcon className="h-3 w-3 text-[#FFD400]" /> WhatsApp</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 300 150" className="h-4 w-6 rounded-[2px] shadow-sm" aria-label="UAE Flag">
                <rect x="0" y="0" width="75" height="150" fill="#FF0000" />
                <rect x="75" y="0" width="225" height="50" fill="#00732F" />
                <rect x="75" y="50" width="225" height="50" fill="#FFFFFF" />
                <rect x="75" y="100" width="225" height="50" fill="#000000" />
              </svg>
              <span className="hidden sm:inline font-semibold text-white/80 text-[10px] uppercase tracking-wider">Proud of UAE</span>
            </div>
            <span className="text-white/30">|</span>
            <span className="font-semibold text-white">EN</span>
            <Link href="/ar" className="hover:text-white transition-colors">AR</Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className={`border-b transition-all duration-300 ${scrolled ? "bg-[#1F3A93]/95 backdrop-blur-md border-white/10 shadow-lg" : "bg-[#1F3A93] border-white/10"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center">
            <img
              src="/images/logo/logo.jpeg"
              alt="Vega Logo"
              className="h-14 w-auto rounded-md object-contain"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </Link>

          {/* Search */}
          <div className="hidden lg:flex flex-1 mx-8 max-w-md">
            <div className="relative w-full">
              <input type="text" placeholder="Search products..." className="w-full rounded-full bg-white/10 border border-white/20 pl-4 pr-10 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#FFD400]" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-sm font-semibold text-white/80 hover:text-white transition-colors">Home</Link>
            <div className="relative" onMouseEnter={() => setMega("products")} onMouseLeave={() => setMega(null)}>
              <button className="flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white transition-colors">
                Products <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {mega === "products" && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                  <div className="w-[800px] rounded-2xl bg-white p-6 shadow-elevated border border-slate-100 animate-scale-in origin-top">
                    <div className="grid grid-cols-4 gap-6">
                      {categories.map((cat) => (
                        <div key={cat.id}>
                          <Link href={`/products/${cat.slug}`} className="block text-sm font-bold text-[#1F3A93] mb-2 hover:text-[#162d70] transition-colors">{cat.name}</Link>
                          <ul className="space-y-1 mb-3">
                            {(cat.subcategories || []).slice(0, 4).map((sub, idx) => (
                              <li key={idx}>
                                <Link href={`/products/${cat.slug}`} className="text-xs text-slate-400 hover:text-[#1F3A93] transition-colors">
                                  {sub}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          {/* Show products in this category */}
                          {(productsByCategory[cat.slug] || []).length > 0 && (
                            <div className="space-y-2 pt-2 border-t border-slate-100">
                              {(productsByCategory[cat.slug] || []).map((prod) => (
                                <Link key={prod.id} href={`/products/${prod.slug}`} className="flex items-center gap-2 group">
                                  <div className="h-8 w-8 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                                    <img src={prod.image} alt={prod.name} className="h-full w-full object-cover" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                                  </div>
                                  <span className="text-[10px] text-slate-500 group-hover:text-[#1F3A93] transition-colors line-clamp-1">{prod.name}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                          <Link href={`/products/${cat.slug}`} className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#FFD400] hover:text-[#1F3A93] transition-colors mt-2">
                            View All <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {["About Us", "Careers", "Blog", "Gallery", "Catalog"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="text-sm font-semibold text-white/80 hover:text-white transition-colors">{item}</Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact-us" className="rounded-full bg-[#FFD400] px-5 py-2 text-sm font-bold text-[#1F3A93] hover:bg-white transition-all duration-300">Contact Us</Link>
          </div>

          <button onClick={() => setMobile(!mobile)} className="lg:hidden p-2 text-white">
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {mobile && (
        <div className="lg:hidden bg-[#1F3A93] border-t border-white/10 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-1">
            <Link href="/" className="block py-3 text-sm font-bold text-white" onClick={() => setMobile(false)}>Home</Link>
            <div className="py-3 border-t border-white/10">
              <span className="text-xs font-bold text-white/40 uppercase mb-2 block">Products</span>
              {categories.map((cat) => (
                <div key={cat.id}>
                  <Link href={`/products/${cat.slug}`} className="block py-2 text-sm font-semibold text-white" onClick={() => setMobile(false)}>{cat.name}</Link>
                  {(cat.subcategories || []).length > 0 && (
                    <div className="pl-3 space-y-1 mb-2">
                      {cat.subcategories!.map((sub, idx) => (
                        <Link key={idx} href={`/products/${cat.slug}`} className="block py-1 text-xs text-white/50" onClick={() => setMobile(false)}>{sub}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {["About Us", "Careers", "Blog", "Gallery", "Catalog", "Contact Us"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="block py-3 text-sm font-semibold text-white/70 border-t border-white/10" onClick={() => setMobile(false)}>{item}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
