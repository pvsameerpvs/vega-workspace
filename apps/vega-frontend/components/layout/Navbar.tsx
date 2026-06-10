"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { ChevronDown, Menu, X, Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SearchBar } from "./SearchBar";
import { ProductMegaMenu } from "./ProductMegaMenu";
import { MobileMenu } from "./MobileMenu";

interface NavbarProps {
  categories?: { id: string; name: string; nameAr?: string; slug: string; subcategories?: { id: string; name: string; nameAr?: string; slug: string }[] }[];
  products?: { id: string; name: string; nameAr?: string; slug: string; image: string; category: string; categorySlug?: string; subcategorySlug?: string }[];
}

export function Navbar({ categories = [], products = [] }: NavbarProps) {
  const [mega, setMega] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isAR = locale === "ar";
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const topHidden = isHome && scrolled;
  const l = (path: string) => `/${locale}${path}`;

  const navItems = [
    { label: isAR ? "الرئيسية" : "Home", path: "/" },
    { label: isAR ? "منتجاتنا" : "Products", path: "/products", hasMega: true },
    { label: isAR ? "من نحن" : "About Us", path: "/about-us" },
    { label: isAR ? "الوظائف" : "Careers", path: "/careers" },
    { label: isAR ? "المدونة" : "Blog", path: "/blog" },
    { label: isAR ? "معرض الصور" : "Gallery", path: "/gallery" },
    { label: isAR ? "الكتالوجات" : "Catalog", path: "/catalog" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className={`bg-[#1F3A93] transition-all duration-500 ${topHidden ? "h-0 opacity-0 overflow-hidden" : "h-auto opacity-100"}`}>
        <div className={`mx-auto flex max-w-7xl items-center px-4 py-3.5 text-base text-white/85 ${isAR ? "flex-row-reverse justify-between" : "justify-between"}`}>
          <div className="flex items-center gap-7" dir="ltr">
            <a href="tel:+971567351095" className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap font-medium">
              <Phone className="h-5 w-5 shrink-0" />
              <span className="tabular-nums">+971 56 735 1095</span>
            </a>
            <a href="mailto:Sales@thevegauae.com" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap font-medium">
              <Mail className="h-5 w-5 shrink-0" />
              sales@thevegauae.com
            </a>
            <a href="https://wa.me/971567351095" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap font-medium">
              <WhatsAppIcon className="h-5 w-5 text-[#FFD400] shrink-0" />
              WhatsApp
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 300 150" className="h-4 w-6 rounded-[2px] shadow-sm shrink-0" aria-label="UAE Flag">
                <rect x="0" y="0" width="75" height="150" fill="#FF0000" />
                <rect x="75" y="0" width="225" height="50" fill="#00732F" />
                <rect x="75" y="50" width="225" height="50" fill="#FFFFFF" />
                <rect x="75" y="100" width="225" height="50" fill="#000000" />
              </svg>
              <span className="hidden sm:inline font-semibold text-white/80 text-[10px] uppercase tracking-wider whitespace-nowrap">
                {isAR ? "فخورون بالإمارات" : "Proud of UAE"}
              </span>
            </div>
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-1" dir="ltr">
              <a href={`/en${pathname.replace(/^\/ar/, "").replace(/^\/en/, "") || "/"}`} className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${!isAR ? "text-[#1F3A93] bg-[#FFD400]" : "text-white/70 hover:text-white"}`} onClick={(e) => { e.preventDefault(); window.location.href = `/en${pathname.replace(/^\/ar/, "").replace(/^\/en/, "") || "/"}`; }}>
                EN
              </a>
              <a href={`/ar${pathname.replace(/^\/en/, "").replace(/^\/ar/, "") || "/"}`} className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${isAR ? "text-[#1F3A93] bg-[#FFD400]" : "text-white/70 hover:text-white"}`} onClick={(e) => { e.preventDefault(); window.location.href = `/ar${pathname.replace(/^\/en/, "").replace(/^\/ar/, "") || "/"}`; }}>
                AR
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className={`border-b transition-all duration-300 ${scrolled ? "bg-[#1F3A93]/95 backdrop-blur-md border-white/10 shadow-lg" : "bg-[#1F3A93] border-white/10"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href={l("/")} className="flex items-center shrink-0">
            <img src="/images/logo/logo.jpeg" alt="Vega Logo" className="h-16 w-auto rounded-md object-contain" draggable={false} onContextMenu={(e) => e.preventDefault()} />
          </Link>

          <div className="hidden lg:flex flex-1 mx-8 max-w-md">
            <SearchBar />
          </div>

          <nav className={`hidden lg:flex items-center gap-6 ${isAR ? "flex-row-reverse mr-6" : "ml-6"}`}>
            <Link href={l("/")} className="text-sm font-semibold text-white/80 hover:text-white transition-colors whitespace-nowrap">{isAR ? "الرئيسية" : "Home"}</Link>
            <div className="relative" onMouseEnter={() => setMega("products")} onMouseLeave={() => setMega(null)}>
              <button className="flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white transition-colors whitespace-nowrap">
                {isAR ? "منتجاتنا" : "Products"} <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <ProductMegaMenu categories={categories} products={products} isAR={isAR} locale={locale} open={mega === "products"} />
            </div>
            {navItems.filter((i) => i.path !== "/" && i.path !== "/products").map((item) => (
              <Link key={item.path} href={l(item.path)} className="text-sm font-semibold text-white/80 hover:text-white transition-colors whitespace-nowrap">{item.label}</Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0 ml-auto">
            <Link href={l("/contact-us")} className="rounded-full bg-[#FFD400] px-5 py-2 text-sm font-bold text-[#1F3A93] hover:bg-white transition-all duration-300 whitespace-nowrap">
              {isAR ? "تواصل معنا" : "Contact Us"}
            </Link>
          </div>

          <button onClick={() => setMobile(!mobile)} className="lg:hidden p-2 text-white shrink-0">
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <MobileMenu open={mobile} onClose={() => setMobile(false)} categories={categories} products={products} isAR={isAR} locale={locale} />
    </header>
  );
}
