import Link from "next/link";
import { ProtectedImage } from "@/components/ProtectedImage";
import { getCategories, mapCategoryToFrontend } from "@/lib/api";

interface PopularCategoriesProps {
  locale?: string;
}

export async function PopularCategories({ locale = "en" }: PopularCategoriesProps) {
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;
  const categories = await getCategories();
  const mapped = (categories || []).map(mapCategoryToFrontend).filter(Boolean) as any[];

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-xl font-bold text-slate-900 mb-8 font-display">{isAR ? "الفئات الشائعة" : "Popular Categories"}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {mapped.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={l(`/products/${cat.slug}`)}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative mb-3 aspect-square w-full max-w-[120px] overflow-hidden rounded-full border-2 border-slate-100 transition-all duration-300 group-hover:border-[#FFD400] group-hover:shadow-md">
                <ProtectedImage
                  src={cat.image}
                  alt={isAR && cat.nameAr ? cat.nameAr : cat.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-xs font-semibold text-slate-700 transition-colors group-hover:text-[#1F3A93]">
                {isAR && cat.nameAr ? cat.nameAr : cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
