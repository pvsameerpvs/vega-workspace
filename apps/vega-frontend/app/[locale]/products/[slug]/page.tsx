import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProducts,
  getCategories,
  mapProductToFrontend,
  mapCategoryToFrontend,
} from "@/lib/api";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProtectedImage } from "@/components/ProtectedImage";
import { getWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";
import { ArrowLeft, Check, Truck, Package, BadgePercent, MapPin, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { isValidLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const all = await getProducts();
  const p = (all || []).find((x: any) => x.slug === params.slug);
  const isAR = params.locale === "ar";
  if (p) {
    const name = isAR && p.nameAr ? p.nameAr : p.name;
    return {
      title: `${name} | Vega UAE`,
      description: p.shortDescriptionAr || p.shortDescription || p.fullDescription,
    };
  }
  return {
    title: "Product | Vega UAE",
    description: "Product details page with specifications and enquiry options.",
  };
}

export default async function ProductOrCategoryPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  if (!isValidLocale(params.locale)) notFound();
  const isAR = params.locale === "ar";
  const l = (path: string) => `/${params.locale}${path}`;

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const mappedProducts = (products || []).map(mapProductToFrontend).filter(Boolean) as any[];
  const mappedCategories = (categories || []).map(mapCategoryToFrontend).filter(Boolean) as any[];

  const category = mappedCategories.find((c) => c.slug === params.slug);
  const product = mappedProducts.find((p) => p.slug === params.slug);

  if (!category && !product) {
    notFound();
  }

  if (category) {
    const categorySlug = category.slug.toLowerCase();
    const categoryProducts = mappedProducts.filter(
      (p) =>
        p.category.toLowerCase().replace(/\s+/g, "-") === categorySlug ||
        p.category.toLowerCase() === category.name.toLowerCase() ||
        p.subcategory.toLowerCase().replace(/\s+/g, "-") === categorySlug
    );
    return (
      <main className="pt-36 pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <Link href={l("/products")} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-vega-blue transition-colors">
            <ArrowLeft className="h-4 w-4" /> {isAR ? "العودة إلى المنتجات" : "Back to Products"}
          </Link>
          <div className="mb-16">
            <span className="mb-6 block text-sm text-slate-400">{isAR ? "الفئة" : "Category"}</span>
            <h1 className="section-heading text-4xl md:text-5xl">{isAR && category.nameAr ? category.nameAr : category.name}</h1>
            <p className="mt-6 text-lg text-slate-500 max-w-lg leading-relaxed">
              {isAR ? `تصفح مجموعة ${(isAR && category.nameAr ? category.nameAr : category.name).toLowerCase()}.` : `Browse our ${category.name.toLowerCase()} collection.`}
            </p>
          </div>
          <div className="mb-16 flex flex-wrap gap-3">
            {category.subcategories.map((sub: string) => (
              <span key={sub} className="text-sm text-slate-500">
                {sub}
              </span>
            ))}
          </div>
          <ProductGrid products={categoryProducts} locale={params.locale} />
        </div>
      </main>
    );
  }

  const related = mappedProducts.filter(
    (p) => p.category === product!.category && p.id !== product!.id
  ).slice(0, 4);

  const displayName = isAR && product!.nameAr ? product!.nameAr : product!.name;
  const displayDesc = isAR && product!.shortDescriptionAr ? product!.shortDescriptionAr : product!.shortDescription || product!.fullDescription || product!.description || "";
  const displayFullDesc = isAR && product!.fullDescriptionAr ? product!.fullDescriptionAr : product!.fullDescription || "";
  const displayFeatures = isAR && product!.featuresAr ? product!.featuresAr : product!.features;

  const specRows = [
    { label: isAR ? "رمز المنتج" : "SKU", value: product!.sku },
    { label: isAR ? "اسم المنتج" : "Item Name", value: displayName },
    { label: isAR ? "الألوان المتاحة" : "Available Colours", value: product!.color },
    { label: isAR ? "التصميم" : "Design", value: product!.design },
    { label: isAR ? "المادة" : "Material", value: product!.material },
    { label: isAR ? "الوزن" : "Weight", value: product!.weight },
    { label: isAR ? "التركيب" : "Fitting", value: product!.fittingType },
    { label: isAR ? "الأبعاد" : "Dimensions", value: product!.dimensions },
    { label: isAR ? "العلامة التجارية" : "Brand", value: product!.brand },
    { label: isAR ? "البلد" : "Country", value: product!.country },
    { label: isAR ? "الضمان" : "Warranty", value: product!.warranty },
  ].filter((row) => row.value && String(row.value).trim());

  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <Link href={l("/products")} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-vega-blue transition-colors">
          <ArrowLeft className="h-4 w-4" /> {isAR ? "العودة إلى المنتجات" : "Back to Products"}
        </Link>

        <div className="grid gap-20 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl bg-slate-100">
              <div className="aspect-square overflow-hidden">
                <ProtectedImage
                  src={product!.image}
                  alt={displayName}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product!.images.map((img: string, i: number) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-slate-100">
                  <ProtectedImage
                    src={img}
                    alt={`${displayName} ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <span className="mb-3 inline-block text-sm text-slate-400">
              {isAR && product!.categoryAr ? product!.categoryAr : product!.category}
            </span>
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl tracking-tight">
              {displayName}
            </h1>
            <p className="mt-2 text-sm text-slate-400">{isAR ? "رمز المنتج" : "SKU"}: {product!.sku}</p>
            {product!.price && product!.showPrice && (
              <p className="mt-3 text-2xl font-bold text-vega-blue">
                AED {product!.price.toLocaleString()}
              </p>
            )}

            {/* Full Description */}
            {displayDesc && (
              <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-md">
                {displayDesc}
              </p>
            )}

            {displayFullDesc && displayFullDesc !== displayDesc && (
              <p className="mt-4 text-base text-slate-500 leading-relaxed max-w-md">
                {displayFullDesc}
              </p>
            )}

            {/* Spec Sheet */}
            {specRows.length > 0 && (
              <div className="mt-12 overflow-hidden rounded-3xl bg-slate-50">
                <div className="px-6 py-4 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-900">{isAR ? "مواصفات المنتج" : "Product Specifications"}</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {specRows.map((row) => (
                    <div key={row.label} className="px-6 py-4 grid grid-cols-3 gap-4">
                      <span className="text-sm text-slate-400">{row.label}</span>
                      <span className="text-sm text-slate-900 col-span-2 font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
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
              {product!.bulkAvailable && (
                <div className="flex items-center gap-3 text-base text-slate-500">
                  <Package className="h-4 w-4 text-vega-yellow" />
                  <span>{product!.bulkQuantityNote || (isAR ? "متوفر بالكميات الكبيرة." : "Available in bulk quantity.")}</span>
                </div>
              )}
              {product!.wholesaleDiscountNote && (
                <div className="flex items-center gap-3 text-base text-slate-500">
                  <BadgePercent className="h-4 w-4 text-vega-yellow" />
                  <span>{product!.wholesaleDiscountNote}</span>
                </div>
              )}
              {product!.wholesaleNote && !product!.wholesaleDiscountNote && (
                <div className="flex items-center gap-3 text-base text-slate-500">
                  <BadgePercent className="h-4 w-4 text-vega-yellow" />
                  <span>{product!.wholesaleNote}</span>
                </div>
              )}
              {product!.deliveryInfo && (
                <div className="flex items-center gap-3 text-base text-slate-500">
                  <Truck className="h-4 w-4 text-vega-yellow" />
                  <span>{product!.deliveryInfo}</span>
                </div>
              )}
              {product!.installation && (
                <div className="flex items-center gap-3 text-base text-slate-500">
                  <MapPin className="h-4 w-4 text-vega-yellow" />
                  <span>{product!.installation}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-12 flex flex-wrap gap-4">
              <Link href={l("/catalog")} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-vega-blue transition-all">
                {isAR ? "تحميل الكتالوج" : "Download Catalog"} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={getWhatsAppLink(product!, params.locale)} target="_blank" className="pill-btn-yellow text-sm group">
                {isAR ? "استفسار عبر واتساب" : "Enquire on WhatsApp"} <WhatsAppIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-32">
            <span className="mb-6 block text-sm text-slate-400">{isAR ? "قد يعجبك أيضاً" : "You May Also Like"}</span>
            <h2 className="section-heading mb-16 text-4xl">{isAR ? "منتجات ذات صلة" : "Related Products"}</h2>
            <ProductGrid products={related} locale={params.locale} />
          </div>
        )}
      </div>
    </main>
  );
}
