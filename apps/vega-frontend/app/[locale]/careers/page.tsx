import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getCareers, mapCareerToFrontend } from "@/lib/api";
import { CareerBenefits } from "./sections/CareerBenefits";
import { CareerList } from "./sections/CareerList";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Careers | Vega UAE",
  description: "Join the Vega team. Explore current job openings and career opportunities.",
};

export default async function CareersPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;

  const jobs = await getCareers();
  const mapped = (jobs || []).map(mapCareerToFrontend).filter(Boolean) as any[];

  return (
    <main className="pt-20 pb-16">
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-6 mb-20">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-[#FFD400]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD400]">
            {isAR ? "انضم إلينا" : "Join Us"}
          </span>
        </div>
        <h1 className="section-heading text-4xl md:text-5xl mb-6">
          {isAR ? "الوظائف في فيجا" : "Careers at Vega"}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          {isAR
            ? "نحن دائماً نبحث عن أفراد موهوبين للانضمام إلى فريقنا. استكشف فرص العمل الحالية وابنِ مسيرتك المهنية مع مورد رائد في الإمارات."
            : "We are always looking for talented individuals to join our team. Explore our current openings and build your career with a leading UAE supplier."}
        </p>
      </div>

      {/* Benefits */}
      <div className="mx-auto max-w-7xl px-6 mb-24">
        <CareerBenefits locale={locale} />
      </div>

      {/* Openings */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-6 bg-[#FFD400]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD400]">
                {isAR ? "الوظائف المفتوحة" : "Openings"}
              </span>
            </div>
            <h2 className="section-heading text-3xl md:text-4xl">
              {isAR ? "الوظائف الشاغرة الحالية" : "Current Vacancies"}
            </h2>
          </div>
          <span className="text-sm font-semibold text-slate-400">
            {mapped.length} {isAR ? "وظيفة متاحة" : `position${mapped.length !== 1 ? "s" : ""} available`}
          </span>
        </div>

        <CareerList jobs={mapped} locale={locale} />
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-6 mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-[#1F3A93] px-8 py-12 md:px-16 md:py-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#FFD400]/10" />
          <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-[#FFD400]/10" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {isAR ? "لم تجد الوظيفة المناسبة؟" : "Did Not Find the Right Role?"}
              </h2>
              <p className="text-sm text-white/60 max-w-md leading-relaxed">
                {isAR
                  ? "أرسل لنا سيرتك الذاتية وسنضعك في الاعتبار للفرص المستقبلية."
                  : "Send us your CV and we will keep you in mind for future openings."}
              </p>
            </div>
            <Link
              href={l("/contact-us")}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD400] px-6 py-3 text-sm font-bold text-[#1F3A93] transition-all duration-300 hover:bg-white hover:shadow-lg"
            >
              {isAR ? "أرسل سيرتك الذاتية" : "Send Your CV"} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
