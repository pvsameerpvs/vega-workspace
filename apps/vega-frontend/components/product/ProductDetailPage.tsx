import { Product } from "@/lib/types";
import { ProtectedImage } from "@/components/ProtectedImage";
import { getWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";
import { ArrowLeft, Check, Truck, Package, BadgePercent, MapPin, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ProductGrid } from "./ProductGrid";
import { getCategoryUrl, getSubcategoryUrl } from "@/lib/url";

interface ProductDetailPageProps {
  product: Product;
  related: Product[];
  locale: string;
}

export function ProductDetailPage({ product, related, locale }: ProductDetailPageProps) {
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;

  const displayName = isAR && product.nameAr ? product.nameAr : product.name;
  const displayDesc = isAR && product.shortDescriptionAr ? product.shortDescriptionAr : product.shortDescription || product.fullDescription || product.description || "";
  const displayFullDesc = isAR && product.fullDescriptionAr ? product.fullDescriptionAr : product.fullDescription || "";
  const displayFeatures = isAR && product.featuresAr ? product.featuresAr : product.features;

  const specRows = [
    { label: isAR ? "رمز المنتج" : "SKU", value: product.sku },
    { label: isAR ? "اسم المنتج" : "Item Name", value: displayName },
    { label: isAR ? "الألوان المتاحة" : "Available Colours", value: product.color },
    { label: isAR ? "التصميم" : "Design", value: product.design },
    { label: isAR ? "المادة" : "Material", value: product.material },
    { label: isAR ? "الوزن" : "Weight", value: product.weight },
    { label: isAR ? "التركيب" : "Fitting", value: product.fittingType },
    { label: isAR ? "الأبعاد" : "Dimensions", value: product.dimensions },
    { label: isAR ? "العلامة التجارية" : "Brand", value: product.brand },
    { label: isAR ? "البلد" : "Country", value: product.country },
    { label: isAR ? "الضمان" : "Warranty", value: product.warranty },
  ].filter((row) => row.value && String(row.value).trim());

  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <Link href={l("/products")} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-vega-blue transition-colors">
          <ArrowLeft className="h-4 w-4" /> {isAR ? "العودة إلى المنتجات" : "Back to Products"}
        </Link>

        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-slate-400">
          <Link href={l("/products")} className="hover:text-vega-blue transition-colors">{isAR ? "المنتجات" : "Products"}</Link>
          {product.categorySlug && (
            <>
              <span className="mx-2">/</span>
              <Link href={getCategoryUrl(product.categorySlug, locale)} className="hover:text-vega-blue transition-colors">
                {isAR && product.categoryAr ? product.categoryAr : product.category}
              </Link>
            </>
          )}
          {product.subcategorySlug && product.categorySlug && (
            <>
              <span className="mx-2">/</span>
              <Link href={getSubcategoryUrl(product.categorySlug, product.subcategorySlug, locale)} className="hover:text-vega-blue transition-colors">
                {isAR && product.subcategoryAr ? product.subcategoryAr : product.subcategory}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-slate-600">{displayName}</span>
        </nav>

        <div className="grid gap-20 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-5 max-w-lg mx-auto">
            <div className="overflow-hidden rounded-3xl bg-slate-100">
              <div className="aspect-[4/3] overflow-hidden flex items-center justify-center bg-slate-50">
                {product.image ? (
                  <ProtectedImage
                    src={product.image}
                    alt={displayName}
                    className="h-full w-full object-contain transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-300">
                    <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs font-medium">{isAR ? "لا توجد صورة" : "No image"}</span>
                  </div>
                )}
              </div>
            </div>
            {product.images.filter(Boolean).length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.filter(Boolean).map((img: string, i: number) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-slate-100">
                    <ProtectedImage
                      src={img}
                      alt={`${displayName} ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <span className="mb-3 inline-block text-sm text-slate-400">
              {isAR && product.categoryAr ? product.categoryAr : product.category}
              {product.subcategory && (
                <>
                  <span className="mx-2 text-slate-300">/</span>
                  {isAR && product.subcategoryAr ? product.subcategoryAr : product.subcategory}
                </>
              )}
            </span>
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl tracking-tight">
              {displayName}
            </h1>
            <p className="mt-2 text-sm text-slate-400">{isAR ? "رمز المنتج" : "SKU"}: {product.sku}</p>
            {product.price && product.showPrice && (
              <p className="mt-3 text-2xl font-bold text-vega-blue">
                AED {product.price.toLocaleString()}
              </p>
            )}

            {/* Spec Sheet */}
            {specRows.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{isAR ? "مواصفات المنتج" : "Product Specifications"}</h3>
                <div className="rounded-2xl border border-slate-200 divide-y divide-slate-200 bg-white">
                  {specRows.map((row) => (
                    <div key={row.label} className="px-5 py-3 flex items-baseline justify-between gap-4">
                      <span className="text-sm text-slate-500 shrink-0">{row.label}</span>
                      <span className="text-sm text-slate-900 font-semibold text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Description */}
            {displayDesc && (
              <p className="mt-10 text-lg text-slate-500 leading-relaxed max-w-md font-display">
                {displayDesc}
              </p>
            )}

            {displayFullDesc && displayFullDesc !== displayDesc && (
              <p className="mt-4 text-base text-slate-500 leading-relaxed max-w-md font-display">
                {displayFullDesc}
              </p>
            )}

            {/* Features */}
            {displayFeatures && displayFeatures.length > 0 && (
              <div className="mt-12">
                <span className="mb-4 block text-sm text-slate-400">{isAR ? "المميزات" : "Features"}</span>
                <ul className="space-y-3">
                  {Array.isArray(displayFeatures) ? displayFeatures.map((f: string) => (
                    <li key={f} className="flex items-center gap-3 text-base text-slate-500">
                      <Check className="h-4 w-4 text-vega-yellow" /> {f}
                    </li>
                  )) : (
                    <li className="flex items-center gap-3 text-base text-slate-500">
                      <Check className="h-4 w-4 text-vega-yellow" /> {displayFeatures}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Extra Info */}
            <div className="mt-12 space-y-4">
              {product.bulkAvailable && (
                <div className="flex items-center gap-3 text-base text-slate-500">
                  <Package className="h-4 w-4 text-vega-yellow" />
                  <span>{product.bulkQuantityNote || (isAR ? "متوفر بالكميات الكبيرة." : "Available in bulk quantity.")}</span>
                </div>
              )}
              {product.wholesaleDiscountNote && (
                <div className="flex items-center gap-3 text-base text-slate-500">
                  <BadgePercent className="h-4 w-4 text-vega-yellow" />
                  <span>{product.wholesaleDiscountNote}</span>
                </div>
              )}
              {product.deliveryInfo && (
                <div className="flex items-center gap-3 text-base text-slate-500">
                  <Truck className="h-4 w-4 text-vega-yellow" />
                  <span>{product.deliveryInfo}</span>
                </div>
              )}
              {product.installation && (
                <div className="flex items-center gap-3 text-base text-slate-500">
                  <MapPin className="h-4 w-4 text-vega-yellow" />
                  <span>{product.installation}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-12 flex flex-wrap gap-4">
              <Link href={l("/catalog")} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-vega-blue transition-all">
                {isAR ? "تحميل الكتالوج" : "Download Catalog"} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={getWhatsAppLink(product, locale)} target="_blank" className="pill-btn-yellow text-sm group">
                {isAR ? "استفسار عبر واتساب" : "Enquire on WhatsApp"} <WhatsAppIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-32">
            <span className="mb-6 block text-sm text-slate-400">{isAR ? "قد يعجبك أيضاً" : "You May Also Like"}</span>
            <h2 className="section-heading mb-16 text-4xl">{isAR ? "منتجات ذات صلة" : "Related Products"}</h2>
            <ProductGrid products={related} locale={locale} />
          </div>
        )}
      </div>
    </main>
  );
}
