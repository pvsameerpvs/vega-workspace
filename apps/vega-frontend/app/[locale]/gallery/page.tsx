import { Metadata } from "next";
import { getGallery, mapGalleryToFrontend } from "@/lib/api";
import { GalleryGrid } from "./sections/GalleryGrid";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Gallery | Vega UAE",
  description: "Explore our product gallery, warehouse, fleet, and team photos.",
};

export default async function GalleryPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  const isAR = locale === "ar";

  const items = await getGallery();
  const mapped = (items || []).map(mapGalleryToFrontend).filter(Boolean) as any[];

  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-[#FFD400]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD400]">
            {isAR ? "معرض الأعمال" : "Portfolio"}
          </span>
        </div>
        <h1 className="section-heading text-4xl md:text-5xl mb-6">
          {isAR ? "معرض الصور" : "Gallery"}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-20">
          {isAR
            ? "عرض بصري لمنتجاتنا، وعمليات المستودع، وأسطول التوصيل، والتركيبات في جميع أنحاء الإمارات."
            : "A visual showcase of our products, warehouse operations, delivery fleet, and installations across the UAE."}
        </p>

        <GalleryGrid items={mapped} locale={locale} />
      </div>
    </main>
  );
}
