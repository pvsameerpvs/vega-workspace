"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import { getCategoryUrl } from "@/lib/url";

interface FooterProps {
  categories?: { id: string; name: string; nameAr?: string; slug: string }[];
}

export function Footer({ categories = [] }: FooterProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;
  const year = new Date().getFullYear();

  const companyLinks = [
    { label: isAR ? "من نحن" : "About Us", path: "/about-us" },
    { label: isAR ? "الوظائف" : "Careers", path: "/careers" },
    { label: isAR ? "المدونة" : "Blog", path: "/blog" },
    { label: isAR ? "معرض الصور" : "Gallery", path: "/gallery" },
    { label: isAR ? "تواصل معنا" : "Contact Us", path: "/contact-us" },
  ];

  return (
    <footer className="bg-[#0f172a] text-white/50 font-sans" dir={isAR ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className={`grid gap-10 md:grid-cols-2 lg:grid-cols-4 ${isAR ? "text-right" : ""}`}>
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className={`flex items-center gap-3 mb-4 ${isAR ? "justify-end" : ""}`}>
              <img
                src="/images/logo/logo.jpeg"
                alt="Vega Logo"
                className="h-16 w-auto rounded-md object-contain"
              />
              <img
                src="/images/logo/veg-logo-text-white.png"
                alt="Vega"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-lg leading-relaxed text-white/40">
              {isAR
                ? "حلول موثوقة للأثاث والحواجز والمستلزمات المخيمات للشركات في الإمارات منذ 2009."
                : "Reliable furniture, barriers, and camp supply solutions for businesses across the UAE since 2009."}
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{isAR ? "المنتجات" : "Products"}</h4>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link href={getCategoryUrl(cat.slug, locale)} className="text-lg hover:text-[#FFD400] transition-colors">
                    {isAR && cat.nameAr ? cat.nameAr : cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{isAR ? "الشركة" : "Company"}</h4>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.path}>
                  <Link href={l(item.path)} className="text-lg hover:text-[#FFD400] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{isAR ? "تواصل معنا" : "Contact"}</h4>
            <ul className="space-y-3" dir="ltr">
              <li className="flex items-center gap-2 text-lg">
                <Mail className="h-4 w-4 text-[#FFD400] shrink-0" />
                <span className="whitespace-nowrap">Sales@thevegauae.com</span>
              </li>
              <li className="flex items-center gap-2 text-lg">
                <Phone className="h-4 w-4 text-[#FFD400] shrink-0" />
                <span className="tabular-nums whitespace-nowrap">+971 56 735 1095</span>
              </li>
              <li className="flex items-center gap-2 text-lg">
                <MapPin className="h-4 w-4 text-[#FFD400] shrink-0" />
                <span>Dubai, UAE</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-10 flex flex-col md:flex-row items-center gap-4 border-t border-white/10 pt-6 ${isAR ? "flex-row-reverse justify-between" : "justify-between"}`}>
          <p className="text-base text-white/30">
            &copy; {year} Vega UAE. {isAR ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <div className="flex gap-4">
            <Link href={l("/contact-us")} className="rounded-full bg-[#FFD400] px-5 py-2 text-base font-bold text-[#1F3A93] hover:bg-white transition-all whitespace-nowrap">
              {isAR ? "اطلب عرض سعر" : "Request a Quote"}
            </Link>
            <Link href={l("/catalog")} className="rounded-full border border-white/20 px-5 py-2 text-base text-white/70 hover:bg-white/10 hover:text-white transition-all whitespace-nowrap">
              {isAR ? "عرض الكتالوج" : "View Catalog"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
