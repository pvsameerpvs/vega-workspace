import { ShieldCheck, Package, Building2 } from "lucide-react";
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
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-vega-yellow/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-vega-blue/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 md:pt-16 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-vega-yellow" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                {hero.eyebrow}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold leading-[1.1] text-vega-blue sm:text-4xl lg:text-[2.75rem]">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
              {hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedAnchor
                href={quoteHref}
                event="lp_hero_quote"
                label={hero.primaryCta}
                className="inline-flex items-center justify-center rounded-full bg-vega-yellow px-7 py-3.5 text-sm font-bold text-vega-blue shadow-md transition-all hover:shadow-lg hover:brightness-95"
              >
                {hero.primaryCta}
              </TrackedAnchor>
              <TrackedAnchor
                href={productsHref}
                event="lp_hero_products"
                label={hero.secondaryCta}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-vega-blue transition-all hover:border-vega-blue hover:bg-vega-blue hover:text-white"
              >
                {hero.secondaryCta}
              </TrackedAnchor>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-400">{trustMicrocopy}</p>
          </div>

          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-elevated">
              <ProtectedImage
                src={image}
                alt={hero.imageAlt}
                className="aspect-[4/3] w-full object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-900/5" />
            </div>

            {hero.specLines.length > 0 && (
              <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-elevated sm:left-6 sm:right-auto sm:w-72">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  {isAR ? "مواصفات سريعة" : "Quick Specifications"}
                </p>
                <ul className="space-y-1.5">
                  {hero.specLines.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-xs font-medium text-slate-600">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-vega-yellow" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
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
            <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-vega-yellow/15 text-vega-blue">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-vega-blue">{item.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}