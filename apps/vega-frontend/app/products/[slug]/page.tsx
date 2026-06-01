import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PRODUCT_CATEGORIES,
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
} from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";
import { ArrowLeft, Check, Truck, Package, BadgePercent, MapPin } from "lucide-react";

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
    <main className="pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <Link href="/products" className="mb-8 inline-flex items-center gap-2 text-base text-gray-400 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
        <div className="mb-12">
          <div className="label-line mb-4">Category</div>
          <h1 className="section-heading">{category.name}</h1>
          <p className="mt-4 text-base text-gray-500 max-w-lg">
            Browse our {category.name.toLowerCase()} collection.
          </p>
        </div>
        <div className="mb-10 flex flex-wrap gap-2">
          {category.subcategories.map((sub) => (
            <span key={sub} className="rounded-full border border-gray-200 px-4 py-2 text-base text-gray-500">
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
    <main className="pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <Link href="/products" className="mb-8 inline-flex items-center gap-2 text-base text-gray-400 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product!.image}
                  alt={product!.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product!.images.map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                  <img
                    src={img}
                    alt={`${product!.name} ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
              {product!.category}
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
              {product!.name}
            </h1>
            <p className="mt-2 text-base text-gray-400">SKU: {product!.sku}</p>

            {/* Spec Sheet */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Product Specifications</span>
              </div>
              <div className="divide-y divide-gray-50">
                <div className="px-5 py-3 grid grid-cols-3 gap-4">
                  <span className="text-sm font-semibold text-gray-500">SKU</span>
                  <span className="text-base text-gray-900 col-span-2">{product!.sku}</span>
                </div>
                <div className="px-5 py-3 grid grid-cols-3 gap-4">
                  <span className="text-sm font-semibold text-gray-500">Item Name</span>
                  <span className="text-base text-gray-900 col-span-2">{product!.name}</span>
                </div>
                <div className="px-5 py-3 grid grid-cols-3 gap-4">
                  <span className="text-sm font-semibold text-gray-500">Colour</span>
                  <span className="text-base text-gray-900 col-span-2">{product!.color}</span>
                </div>
                <div className="px-5 py-3 grid grid-cols-3 gap-4">
                  <span className="text-sm font-semibold text-gray-500">Design</span>
                  <span className="text-base text-gray-900 col-span-2">{product!.design}</span>
                </div>
                <div className="px-5 py-3 grid grid-cols-3 gap-4">
                  <span className="text-sm font-semibold text-gray-500">Weight</span>
                  <span className="text-base text-gray-900 col-span-2">{product!.weight}</span>
                </div>
                <div className="px-5 py-3 grid grid-cols-3 gap-4">
                  <span className="text-sm font-semibold text-gray-500">Fitting</span>
                  <span className="text-base text-gray-900 col-span-2">{product!.fittingType}</span>
                </div>
                <div className="px-5 py-3 grid grid-cols-3 gap-4">
                  <span className="text-sm font-semibold text-gray-500">Dimensions</span>
                  <span className="text-base text-gray-900 col-span-2">{product!.dimensions}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            {product!.features.length > 0 && (
              <div className="mt-8">
                <div className="label-line mb-3">Features</div>
                <ul className="space-y-2">
                  {product!.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-base text-gray-500">
                      <Check className="h-4 w-4 text-green-500" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Extra Info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 text-base text-gray-600">
                <Package className="h-4 w-4 text-vega-blue" />
                <span>Available in bulk quantity.</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-600">
                <BadgePercent className="h-4 w-4 text-vega-blue" />
                <span>Wholesale Discount {product!.wholesaleNote}.</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-600">
                <Truck className="h-4 w-4 text-vega-blue" />
                <span>Delivery and Installation all across UAE.</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-600">
                <MapPin className="h-4 w-4 text-vega-blue" />
                <span>{product!.deliveryInfo}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/catalog" className="pill-btn">
                Download Catalog
              </Link>
              <Link href={getWhatsAppLink(product!)} target="_blank" className="pill-btn-primary">
                Enquire on WhatsApp
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
