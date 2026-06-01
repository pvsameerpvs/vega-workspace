import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PRODUCT_CATEGORIES,
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
} from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProtectedImage } from "@/components/ProtectedImage";
import { getWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";
import { ArrowLeft, Check, Truck, Package, BadgePercent, MapPin, ArrowUpRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === params.slug);
  if (category) {
    return {
      title: `${category.name} | Vega UAE`,
      description: `Browse ${category.name} products from Vega UAE.`,
    };
  }
  const product = getProductBySlug(params.slug);
  if (product) {
    return {
      title: `${product.name} | Vega UAE`,
      description: product.description,
    };
  }
  return {
    title: "Product | Vega UAE",
    description: "Product details page with specifications and enquiry options.",
  };
}

export default function ProductOrCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === params.slug);
  const product = getProductBySlug(params.slug);

  if (!category && !product) {
    notFound();
  }

  if (category) {
    const categoryProducts = getProductsByCategory(category.slug);
    return (
      <main className="pt-36 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Link href="/products" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-vega-blue transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Link>
          <div className="mb-12">
            <div className="label-line mb-4">Category</div>
            <h1 className="section-heading">{category.name}</h1>
            <p className="mt-4 text-base text-slate-500 max-w-lg leading-relaxed">
              Browse our {category.name.toLowerCase()} collection.
            </p>
          </div>
          <div className="mb-10 flex flex-wrap gap-2">
            {category.subcategories.map((sub) => (
              <span key={sub} className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500 bg-slate-50">
                {sub}
              </span>
            ))}
          </div>
          <ProductGrid products={categoryProducts} />
        </div>
      </main>
    );
  }

  const related = getRelatedProducts(product!);

  return (
    <main className="pt-36 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <Link href="/products" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-vega-blue transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-card">
              <div className="aspect-square overflow-hidden">
                <ProtectedImage
                  src={product!.image}
                  alt={product!.name}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product!.images.map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl border border-slate-100 bg-slate-50 shadow-subtle transition-all duration-300 hover:shadow-md hover:border-vega-blue/20">
                  <ProtectedImage
                    src={img}
                    alt={`${product!.name} ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-vega-blue/10 px-3 py-1 text-xs font-bold text-vega-blue border border-vega-blue/10">
              {product!.category}
            </div>
            <h1 className="text-2xl font-bold text-vega-blue md:text-3xl tracking-tight">
              {product!.name}
            </h1>
            <p className="mt-2 text-sm text-slate-400">SKU: {product!.sku}</p>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-md">
              {product!.description}
            </p>

            {/* Spec Sheet */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-100">
                <span className="text-xs font-bold text-vega-blue uppercase tracking-wider">Product Specifications</span>
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  { label: "SKU", value: product!.sku },
                  { label: "Item Name", value: product!.name },
                  { label: "Colour", value: product!.color },
                  { label: "Design", value: product!.design },
                  { label: "Weight", value: product!.weight },
                  { label: "Fitting", value: product!.fittingType },
                  { label: "Dimensions", value: product!.dimensions },
                ].map((row) => (
                  <div key={row.label} className="px-5 py-3 grid grid-cols-3 gap-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{row.label}</span>
                    <span className="text-sm text-vega-blue col-span-2 font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {product!.features.length > 0 && (
              <div className="mt-8">
                <div className="label-line mb-3">Features</div>
                <ul className="space-y-2">
                  {product!.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-500">
                      <Check className="h-4 w-4 text-vega-yellow" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Extra Info */}
            <div className="mt-8 space-y-3">
              {[
                { icon: Package, text: "Available in bulk quantity." },
                { icon: BadgePercent, text: `Wholesale Discount ${product!.wholesaleNote}.` },
                { icon: Truck, text: "Delivery and Installation all across UAE." },
                { icon: MapPin, text: product!.deliveryInfo },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-slate-600">
                  <item.icon className="h-4 w-4 text-vega-yellow" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/catalog" className="pill-btn">
                Download Catalog
              </Link>
              <Link href={getWhatsAppLink(product!)} target="_blank" className="pill-btn-yellow group">
                Enquire on WhatsApp <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <div className="label-line mb-4">You May Also Like</div>
            <h2 className="section-heading mb-10">Related Products</h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </main>
  );
}
