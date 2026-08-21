import type { Product } from "@/lib/types";
import { LandingSectionHeader } from "./LandingSectionHeader";
import { LandingProductCard } from "./LandingProductCard";
import { LandingSectionHeading } from "./types";

export function LandingProducts({
  heading,
  products,
  isAR,
  getQuoteLabel,
  viewDetailsLabel,
  emptyText,
}: {
  heading: LandingSectionHeading;
  products: Product[];
  isAR: boolean;
  getQuoteLabel: string;
  viewDetailsLabel: string;
  emptyText: string;
}) {
  return (
    <section id="products" className="scroll-mt-32 md:scroll-mt-40 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <LandingSectionHeader heading={heading} isAR={isAR} />
        {products.length === 0 ? (
          <p className="mx-auto max-w-md text-center text-sm text-slate-400">{emptyText}</p>
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