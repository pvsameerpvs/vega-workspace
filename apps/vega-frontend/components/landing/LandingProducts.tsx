import type { Product } from "@/lib/types";
import { LandingSectionHeader } from "./LandingSectionHeader";
import { LandingProductCard } from "./LandingProductCard";
import type { LandingProductGroup } from "./data";
import type { LandingSectionHeading } from "./types";

export function LandingProducts({
  heading,
  groups,
  products,
  isAR,
  getQuoteLabel,
  viewDetailsLabel,
  emptyText,
}: {
  heading: LandingSectionHeading;
  groups?: LandingProductGroup[];
  products: Product[];
  isAR: boolean;
  getQuoteLabel: string;
  viewDetailsLabel: string;
  emptyText: string;
}) {
  const hasGroups = !!groups && groups.length > 0;
  const countLabel = isAR ? "منتجات" : "products";

  return (
    <section id="products" className="scroll-mt-32 md:scroll-mt-40 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <LandingSectionHeader heading={heading} isAR={isAR} />
        {!hasGroups && products.length === 0 ? (
          <p className="mx-auto max-w-md text-center text-sm text-slate-400">{emptyText}</p>
        ) : hasGroups ? (
          <div className="space-y-14 md:space-y-20">
            {groups.map((group) => (
              <div key={group.id} id={`products-${group.slug}`} className="scroll-mt-32">
                <div className="mb-6 flex items-baseline justify-between gap-4 border-b-2 border-vega-yellow pb-3 md:mb-8">
                  <h3 className="text-xl font-bold text-vega-blue">
                    {isAR ? group.nameAr || group.name : group.name}
                  </h3>
                  <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-slate-400">
                    {group.products.length} {countLabel}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                  {group.products.map((product) => (
                    <LandingProductCard
                      key={product.id}
                      product={product}
                      isAR={isAR}
                      getQuoteLabel={getQuoteLabel}
                      viewDetailsLabel={viewDetailsLabel}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <LandingProductCard
                key={product.id}
                product={product}
                isAR={isAR}
                getQuoteLabel={getQuoteLabel}
                viewDetailsLabel={viewDetailsLabel}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}