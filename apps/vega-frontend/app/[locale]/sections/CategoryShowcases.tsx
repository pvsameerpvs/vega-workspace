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

      <div className="relative mx-auto max-w-7xl px-4 pt-20 lg:pt-28 pb-20 lg:pb-28">
        <div className="text-center mb-16 lg:mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-vega-yellow" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-vega-blue/60">
              {isAR ? "استكشف مجموعاتنا" : "Explore Our Collections"}
            </span>
            <div className="h-px w-12 bg-vega-yellow" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-display leading-tight">
            {isAR ? "فئاتنا المتميزة" : "Premium Categories"}
          </h2>
          <div className="w-20 h-1 bg-vega-yellow rounded-full mx-auto mt-6" />
        </div>

        {active.map((item, i) => (
          <CategoryShowcaseItem key={item.id} item={item} index={i} locale={locale} isAR={isAR} />
        ))}
      </div>
    </section>
  );
}
