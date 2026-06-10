"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getCategoryUrl, getSubcategoryUrl, getProductUrl } from "@/lib/url";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  categories: { id: string; name: string; nameAr?: string; slug: string; subcategories?: { id: string; name: string; nameAr?: string; slug: string }[] }[];
  products?: { id: string; name: string; nameAr?: string; slug: string; image: string; subcategorySlug?: string }[];
  isAR: boolean;
  locale: string;
}

export function MobileMenu({ open, onClose, categories, products = [], isAR, locale }: MobileMenuProps) {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);

  if (!open) return null;

  const l = (path: string) => `/${locale}${path}`;
  const navItems = [
    { label: isAR ? "من نحن" : "About Us", path: "/about-us" },
    { label: isAR ? "الوظائف" : "Careers", path: "/careers" },
    { label: isAR ? "المدونة" : "Blog", path: "/blog" },
    { label: isAR ? "معرض الصور" : "Gallery", path: "/gallery" },
    { label: isAR ? "الكتالوجات" : "Catalog", path: "/catalog" },
    { label: isAR ? "تواصل معنا" : "Contact Us", path: "/contact-us" },
  ];

  const productsBySub = (subSlug: string) =>
    products.filter((p) => p.subcategorySlug === subSlug);

  return (
    <div className="lg:hidden bg-[#1F3A93] border-t border-white/10 shadow-xl max-h-[80vh] overflow-y-auto">
      <div className="p-4 space-y-1">
        <Link href={l("/")} className="block py-3 text-sm font-bold text-white" onClick={onClose}>
          {isAR ? "الرئيسية" : "Home"}
        </Link>
        <div className="py-3 border-t border-white/10">
          <span className="text-xs font-bold text-white/40 uppercase mb-2 block">{isAR ? "المنتجات" : "Products"}</span>
          {categories.map((cat) => {
            const subs = cat.subcategories || [];
            const isCatOpen = expandedCat === cat.slug;
            return (
              <div key={cat.id}>
                <div className="flex items-center justify-between">
                  <Link href={getCategoryUrl(cat.slug, locale)} className="py-2 text-sm font-semibold text-white" onClick={onClose}>
                    {isAR && cat.nameAr ? cat.nameAr : cat.name}
                  </Link>
                  {subs.length > 0 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setExpandedCat(isCatOpen ? null : cat.slug); setExpandedSub(null); }}
                      className="p-1 text-white/50 hover:text-white transition-colors"
                    >
                      {isCatOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                  )}
                </div>
                {subs.length > 0 && (
                  <div className={`overflow-hidden transition-all duration-300 ${isCatOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="pl-4 space-y-1 pb-2 pt-1">
                      {subs.map((sub) => {
                        const subProds = productsBySub(sub.slug);
                        const isSubOpen = expandedSub === sub.slug;
                        return (
                          <div key={sub.slug}>
                            <div className="flex items-center justify-between">
                              <Link
                                href={getSubcategoryUrl(cat.slug, sub.slug, locale)}
                                onClick={onClose}
                                className="block py-1.5 text-xs text-white/60 hover:text-white transition-colors"
                              >
                                {isAR && sub.nameAr ? sub.nameAr : sub.name}
                              </Link>
                              {subProds.length > 0 && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); setExpandedSub(isSubOpen ? null : sub.slug); }}
                                  className="p-1 text-white/30 hover:text-white/60 transition-colors"
                                >
                                  {isSubOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                                </button>
                              )}
                            </div>
                            {subProds.length > 0 && (
                              <div className={`overflow-hidden transition-all duration-300 ${isSubOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="pl-4 space-y-1 pb-2 pt-1">
                                  {subProds.map((prod) => (
                                    <Link
                                      key={prod.id}
                                      href={getProductUrl(prod as any, locale)}
                                      onClick={onClose}
                                      className="flex items-center gap-2 py-1.5 text-xs text-white/40 hover:text-white transition-colors"
                                    >
                                      <div className="h-6 w-6 rounded bg-white/10 overflow-hidden shrink-0">
                                        <img src={prod.image} alt="" className="h-full w-full object-cover" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                                      </div>
                                      {isAR && prod.nameAr ? prod.nameAr : prod.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {navItems.map((item) => (
          <Link key={item.path} href={l(item.path)} className="block py-3 text-sm font-semibold text-white/70 border-t border-white/10" onClick={onClose}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
