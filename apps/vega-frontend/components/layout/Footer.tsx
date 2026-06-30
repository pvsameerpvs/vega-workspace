"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
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
                <Globe className="h-4 w-4 text-[#FFD400] shrink-0" />
                <span className="tabular-nums whitespace-nowrap">+971 4 349 8999</span>
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
          <div className="flex items-center gap-3">
            {[
              { name: "WhatsApp", href: "https://wa.me/971567351095", icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
              { name: "LinkedIn", href: "https://www.linkedin.com/company/thevegauae", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              { name: "Facebook", href: "https://www.facebook.com/thevegauae", icon: "M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
            ].map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/50 hover:bg-[#FFD400] hover:text-[#1F3A93] transition-all" aria-label={s.name}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
              </a>
            ))}
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
