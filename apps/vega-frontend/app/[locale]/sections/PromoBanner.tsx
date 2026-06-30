import Link from "next/link";
import { ArrowRight, Percent } from "lucide-react";

interface PromoBannerProps {
  locale?: string;
}

export function PromoBanner({ locale = "en" }: PromoBannerProps) {
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;

  return (
    <section className="bg-[#1F3A93]">
      <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD400] shrink-0">
            <Percent className="h-6 w-6 text-[#1F3A93]" />
          </div>
        <div>
  <h3 className="text-sm md:text-base font-bold text-white">
    {isAR ? "تواصل معنا للحصول على عرض سعر" : "Contact Us For A Quotation"}
  </h3>
  <p className="text-xs text-white/60">
    {isAR
      ? "استفد من خبرتنا واحصل على أفضل الأسعار لطلبات الجملة. يسعدنا التعاون معك!"
      : "Access our expertise and best pricing on bulk requirements. Let’s work together!"}
  </p>
</div>
        </div>
        <Link href={l("/contact-us")} className="inline-flex items-center gap-2 rounded-full bg-[#FFD400] px-6 py-2.5 text-sm font-bold text-[#1F3A93] hover:bg-white transition-all shrink-0">
          {isAR ? "اطلب عرض سعر" : "Request a Quote"} <ArrowRight className={`h-4 w-4 ${isAR ? "rotate-180" : ""}`} />
        </Link>
      </div>
    </section>
  );
}
