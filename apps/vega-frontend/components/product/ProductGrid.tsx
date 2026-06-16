"use client";

import { Product } from "@/lib/types";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { getProductUrl } from "@/lib/url";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Eye } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ProtectedImage } from "@/components/ProtectedImage";

interface ProductGridProps {
  products: Product[];
  locale?: string;
}

export function ProductGrid({ products, locale = "en" }: ProductGridProps) {
  const router = useRouter();
  const isAR = locale === "ar";

  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vega-blue/5">
          <svg className="h-6 w-6 text-vega-blue/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p className="text-base text-slate-400">{isAR ? "لم يتم العثور على منتجات." : "No products found."}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, i) => {
        const name = isAR && product.nameAr ? product.nameAr : product.name;
        const desc = isAR && product.shortDescriptionAr ? product.shortDescriptionAr : product.description;
        const category = isAR && product.categoryAr ? product.categoryAr : product.category;
        const subcategory = isAR && product.subcategoryAr ? product.subcategoryAr : product.subcategory;

        return (
          <div
            key={product.id}
            className="group animate-fade-in-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {/* Card Container */}
            <div className="modern-card overflow-hidden transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2">
              {/* Image Section */}
              <Link href={getProductUrl(product, locale)} className="block relative overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <ProtectedImage
                    src={product.image || ""}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-vega-blue/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Badges */}
                <div className="absolute left-4 top-4 z-10">
                  <span title={product.sku || ""} className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-vega-blue shadow-md border border-vega-blue/10">
                    {product.sku}
                  </span>
                </div>
                {subcategory && (
                  <div className="absolute right-4 top-4 z-10">
                    <span title={subcategory} className="inline-flex items-center rounded-full bg-vega-yellow/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-vega-blue shadow-md">
                      {subcategory.length > 11 ? `${subcategory.slice(0, 11).trim()}...` : subcategory}
                    </span>
                  </div>
                )}

                {/* Hover Overlay with Quick Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-black/20 backdrop-blur-[2px]">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(getProductUrl(product, locale));
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-vega-blue shadow-lg transition-all duration-300 hover:bg-vega-blue hover:text-white hover:scale-105 font-heading"
                  >
                    <Eye className="h-3.5 w-3.5" /> {isAR ? "عرض" : "View"}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      window.open(getWhatsAppLink(product, locale), "_blank");
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-vega-yellow px-4 py-2 text-xs font-bold text-vega-blue shadow-lg transition-all duration-300 hover:bg-white hover:scale-105"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" /> {isAR ? "استفسار" : "Enquire"}
                  </button>
                </div>
              </Link>

              {/* Content Section */}
              <div className="p-5">
                {/* Category label */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-vega-yellow">
                    {category}
                  </span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                {/* Product Name */}
                <h3 className="text-base font-bold text-vega-blue leading-tight tracking-tight mb-2 group-hover:text-vega-blue transition-colors">
                  {name}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4 min-h-[2.5rem]">
                  {desc}
                </p>

                {/* Divider */}
                <div className="mb-4 h-px bg-slate-100" />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  <Link
                    href={getProductUrl(product, locale)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 px-4 py-2.5 text-xs font-bold text-vega-blue transition-all duration-300 hover:border-vega-blue hover:bg-vega-blue hover:text-white hover:shadow-md font-heading"
                  >
                    <Eye className="h-3.5 w-3.5" /> {isAR ? "التفاصيل" : "Details"}
                  </Link>
                  <button
                     onClick={() => window.open(getWhatsAppLink(product, locale), "_blank")}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-vega-yellow px-4 py-2.5 text-xs font-bold text-vega-blue transition-all duration-300 hover:bg-vega-yellow-dark hover:shadow-yellow hover:-translate-y-0.5"
                  >
                    {isAR ? "استفسار" : "Enquire"} <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
