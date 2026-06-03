import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CatalogCTAProps {
  locale?: string;
}

export function CatalogCTA({ locale = "en" }: CatalogCTAProps) {
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#1F3A93] px-8 py-12 md:px-16 md:py-16">
      {/* Decorative circles */}
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#FFD400]/10" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-[#FFD400]/10" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {isAR ? "بحاجة إلى عرض سعر مخصص؟" : "Need a Custom Quote?"}
          </h2>
          <p className="text-sm text-white/60 max-w-md leading-relaxed">
            {isAR
              ? "لم تجد ما تبحث عنه؟ تواصل معنا للطلبات بالجملة، أو العلامة التجارية المخصصة، أو المتطلبات الخاصة."
              : "Can not find what you are looking for? Reach out to us for bulk orders, custom branding, or special requirements."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={l("/contact-us")}
            className="inline-flex items-center gap-2 rounded-full bg-[#FFD400] px-6 py-3 text-sm font-bold text-[#1F3A93] transition-all duration-300 hover:bg-white hover:shadow-lg"
          >
            {isAR ? "تواصل معنا" : "Contact Us"} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={l("/products")}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            {isAR ? "تصفح المنتجات" : "Browse Products"}
          </Link>
        </div>
      </div>
    </div>
  );
}
