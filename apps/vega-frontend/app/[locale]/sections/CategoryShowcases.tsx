import { CategoryShowcaseItem } from "./CategoryShowcaseItem";
import { getCategoryShowcases } from "@/lib/api";

interface CategoryShowcasesProps {
  locale?: string;
}

export async function CategoryShowcases({ locale = "en" }: CategoryShowcasesProps) {
  const isAR = locale === "ar";
  const items = await getCategoryShowcases();
  const active = (items || []).filter((s) => s.isActive);
  if (!active.length) return null;

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="text-center mb-10 lg:mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-vega-yellow" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-vega-blue/60">
              {isAR ? "استكشف مجموعاتنا" : "Explore Our Collections"}
            </span>
            <div className="h-px w-10 bg-vega-yellow" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 font-display leading-tight">
            {isAR ? "فئاتنا المتميزة" : "Premium Categories"}
          </h2>
          <div className="w-20 h-1 bg-vega-yellow rounded-full mx-auto mt-4" />
        </div>

        <div className="flex flex-col gap-10 lg:gap-12">
          {active.map((item, i) => (
            <div key={item.id} className={`${i > 0 ? "border-t border-slate-200 pt-10 lg:pt-12" : ""}`}>
              <CategoryShowcaseItem item={item} index={i} locale={locale} isAR={isAR} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
