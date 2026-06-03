"use client";

import Link from "next/link";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  categories: { id: string; name: string; nameAr?: string; slug: string; subcategories?: string[] }[];
  isAR: boolean;
  locale: string;
}

export function MobileMenu({ open, onClose, categories, isAR, locale }: MobileMenuProps) {
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

  return (
    <div className="lg:hidden bg-[#1F3A93] border-t border-white/10 shadow-xl max-h-[80vh] overflow-y-auto">
      <div className="p-4 space-y-1">
        <Link href={l("/")} className="block py-3 text-sm font-bold text-white" onClick={onClose}>
          {isAR ? "الرئيسية" : "Home"}
        </Link>
        <div className="py-3 border-t border-white/10">
          <span className="text-xs font-bold text-white/40 uppercase mb-2 block">{isAR ? "المنتجات" : "Products"}</span>
          {categories.map((cat) => (
            <div key={cat.id}>
              <Link href={l(`/products/${cat.slug}`)} className="block py-2 text-sm font-semibold text-white" onClick={onClose}>
                {isAR && cat.nameAr ? cat.nameAr : cat.name}
              </Link>
              {(cat.subcategories || []).length > 0 && (
                <div className="pl-3 space-y-1 mb-2">
                  {cat.subcategories!.map((sub, idx) => (
                    <Link key={idx} href={l(`/products/${cat.slug}`)} className="block py-1 text-xs text-white/50" onClick={onClose}>
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
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
