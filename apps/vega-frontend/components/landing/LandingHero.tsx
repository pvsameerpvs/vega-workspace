import { ShieldCheck, Package, Building2 } from "lucide-react";
import { LandingHeroSlider } from "./LandingHeroSlider";
import { LandingHeroContent } from "./LandingHeroContent";
import { LandingHero as LandingHeroContentType } from "./types";

export function LandingHero({
  hero,
  images,
  isAR,
  quoteHref,
  productsHref,
  trustMicrocopy,
}: {
  hero: LandingHeroContentType;
  images: string[];
  isAR: boolean;
  quoteHref: string;
  productsHref: string;
  trustMicrocopy: string;
}) {
  return (
    <>
      <section className="relative flex min-h-[540px] w-full items-center overflow-hidden bg-vega-blue sm:min-h-[640px] lg:h-[calc(100vh-7rem)]">
        <LandingHeroSlider images={images} alt={hero.imageAlt} isAR={isAR} />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div
          className={`pointer-events-none absolute inset-0 ${
            isAR ? "bg-gradient-to-l" : "bg-gradient-to-r"
          } from-black/60 via-black/10 to-transparent`}
        />
        <div className="pointer-events-none absolute inset-0 bg-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 md:px-8 lg:py-24">
          <LandingHeroContent
            hero={hero}
            isAR={isAR}
            quoteHref={quoteHref}
            productsHref={productsHref}
            trustMicrocopy={trustMicrocopy}
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 md:px-8">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-sm sm:grid-cols-3">
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
    </>
  );
}