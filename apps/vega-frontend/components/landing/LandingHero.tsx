import { ArrowRight, ShieldCheck, Package, Building2, BadgeCheck } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";
import { TrackedAnchor } from "./TrackedAnchor";
import { LandingHero as LandingHeroContent } from "./types";

export function LandingHero({
  hero,
  image,
  isAR,
  quoteHref,
  productsHref,
  trustMicrocopy,
}: {
  hero: LandingHeroContent;
  image: string;
  isAR: boolean;
  quoteHref: string;
  productsHref: string;
  trustMicrocopy: string;
}) {
  const trustItems = trustMicrocopy.split("•").map((t) => t.trim()).filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-slate-50">
      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(31,58,147,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,58,147,0.035)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      {/* Soft glows */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-vega-yellow/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-vega-blue/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 md:pt-20 lg:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-vega-blue/10 bg-white px-4 py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-vega-yellow" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-vega-blue">
                {hero.eyebrow}
              </span>
            </div>

            <h1 className="text-[2rem] font-extrabold leading-[1.08] tracking-tight text-vega-blue sm:text-5xl lg:text-[3.25rem]">
              {hero.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
              {hero.subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <TrackedAnchor
                href={quoteHref}
                event="lp_hero_quote"
                label={hero.primaryCta}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-vega-yellow px-8 py-4 text-sm font-bold text-vega-blue shadow-lg shadow-vega-yellow/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-vega-yellow/30 hover:brightness-95"
              >
                {hero.primaryCta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </TrackedAnchor>
              <TrackedAnchor
                href={productsHref}
                event="lp_hero_products"
                label={hero.secondaryCta}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-vega-blue transition-all duration-300 hover:-translate-y-0.5 hover:border-vega-blue hover:bg-vega-blue hover:text-white hover:shadow-lg"
              >
                {hero.secondaryCta}
              </TrackedAnchor>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2">
              {trustItems.map((item, i) => (
                <span key={item} className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-vega-yellow" />}
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
            {/* Offset gradient frame */}
            <div className="absolute -inset-2.5 rounded-[2.5rem] bg-gradient-to-br from-vega-yellow/40 via-transparent to-vega-blue/20 md:-inset-4" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-elevated">
              <ProtectedImage
                src={image}
                alt={hero.imageAlt}
                className="aspect-[4/3] w-full object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-slate-900/5" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vega-blue/10 via-transparent to-transparent" />
            </div>

            {/* Floating spec card */}
            {hero.specLines.length > 0 && (
              <div className="absolute -bottom-6 start-4 end-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-elevated backdrop-blur-md sm:start-8 sm:end-auto sm:w-80 sm:p-5">
                <div className="mb-3 flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-vega-blue" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    {isAR ? "مواصفات سريعة" : "Quick Specifications"}
                  </p>
                </div>
                <ul className="space-y-2">
                  {hero.specLines.map((line) => (
                    <li key={line} className="flex items-start gap-2.5 text-xs font-medium text-slate-600">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-vega-yellow" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Floating badge */}
            <div className="absolute -top-4 end-6 hidden items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2 shadow-lg backdrop-blur-md sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-vega-blue">
                {isAR ? "تزويد تجاري" : "Commercial Supply"}
              </span>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-24 grid gap-px overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-sm sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              label: isAR ? "جودة المنتج" : "Product Quality",
              desc: isAR ? "منتجات مختارة للاستخدام التجاري" : "Products selected for commercial use",
            },
            {
              icon: Package,
              label: isAR ? "طلبات الجملة" : "Bulk Orders",
              desc: isAR ? "كميات المشاريع والطلبات الكبيرة" : "Project & large quantity requirements",
            },
            {
              icon: Building2,
              label: isAR ? "تزويد تجاري" : "Commercial Supply",
              desc: isAR ? "حلول للشركات والمنشآت" : "Solutions for businesses & institutions",
            },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4 bg-white p-5 transition-colors duration-300 hover:bg-slate-50 md:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-vega-yellow/15 text-vega-blue">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-vega-blue">{item.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}