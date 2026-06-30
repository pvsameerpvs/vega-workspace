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

      <div className="relative mx-auto max-w-7xl px-6 py-8 xl:px-8">
        <div className="text-center mb-14 lg:mb-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-vega-yellow" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-vega-blue/60">
              {isAR ? "استكشف مجموعاتنا" : "Explore Our Collections"}
            </span>
            <div className="h-px w-12 bg-vega-yellow" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-display leading-tight tracking-tight">
         {isAR ? "فئة المنتجات المتميزة" : "Premium Product Category"}
        </h2>
          <div className="w-24 h-1.5 bg-vega-yellow rounded-full mx-auto mt-5" />
        </div>

        <div className="flex flex-col gap-16 lg:gap-24">
          {active.map((item, i) => (
            <div key={item.id} className={`${i > 0 ? "border-t border-slate-200 pt-16 lg:pt-20" : ""}`}>
              <CategoryShowcaseItem item={item} index={i} locale={locale} isAR={isAR} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
