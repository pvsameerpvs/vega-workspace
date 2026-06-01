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
import { ArrowLeft, Check, Truck, Package, BadgePercent, MapPin, ArrowRight } from "lucide-react";

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
      <main className="pt-36 pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <Link href="/products" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-vega-blue transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Link>
          <div className="mb-16">
            <span className="mb-6 block text-sm text-slate-400">Category</span>
            <h1 className="section-heading text-4xl md:text-5xl">{category.name}</h1>
            <p className="mt-6 text-lg text-slate-500 max-w-lg leading-relaxed">
              Browse our {category.name.toLowerCase()} collection.
            </p>
          </div>
          <div className="mb-16 flex flex-wrap gap-3">
            {category.subcategories.map((sub) => (
              <span key={sub} className="text-sm text-slate-500">
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
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <Link href="/products" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-vega-blue transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid gap-20 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl bg-slate-100">
              <div className="aspect-square overflow-hidden">
                <ProtectedImage
                  src={product!.image}
                  alt={product!.name}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product!.images.map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-slate-100">
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
            <span className="mb-3 inline-block text-sm text-slate-400">
              {product!.category}
            </span>
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl tracking-tight">
              {product!.name}
            </h1>
            <p className="mt-2 text-sm text-slate-400">SKU: {product!.sku}</p>
            <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-md">
              {product!.description}
            </p>

            {/* Spec Sheet */}
            <div className="mt-12 overflow-hidden rounded-3xl bg-slate-50">
              <div className="px-6 py-4 border-b border-slate-100">
                <span className="text-sm font-semibold text-slate-900">Product Specifications</span>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { label: "SKU", value: product!.sku },
                  { label: "Item Name", value: product!.name },
                  { label: "Colour", value: product!.color },
                  { label: "Design", value: product!.design },
                  { label: "Weight", value: product!.weight },
                  { label: "Fitting", value: product!.fittingType },
                  { label: "Dimensions", value: product!.dimensions },
                ].map((row) => (
                  <div key={row.label} className="px-6 py-4 grid grid-cols-3 gap-4">
                    <span className="text-sm text-slate-400">{row.label}</span>
                    <span className="text-sm text-slate-900 col-span-2 font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {product!.features.length > 0 && (
              <div className="mt-12">
                <span className="mb-4 block text-sm text-slate-400">Features</span>
                <ul className="space-y-3">
                  {product!.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-base text-slate-500">
                      <Check className="h-4 w-4 text-vega-yellow" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Extra Info */}
            <div className="mt-12 space-y-4">
              {[
                { icon: Package, text: "Available in bulk quantity." },
                { icon: BadgePercent, text: `Wholesale Discount ${product!.wholesaleNote}.` },
                { icon: Truck, text: "Delivery and Installation all across UAE." },
                { icon: MapPin, text: product!.deliveryInfo },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-base text-slate-500">
                  <item.icon className="h-4 w-4 text-vega-yellow" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-vega-blue transition-all">
                Download Catalog <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={getWhatsAppLink(product!)} target="_blank" className="pill-btn-yellow text-sm group">
                Enquire on WhatsApp <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-32">
            <span className="mb-6 block text-sm text-slate-400">You May Also Like</span>
            <h2 className="section-heading mb-16 text-4xl">Related Products</h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </main>
  );
}
