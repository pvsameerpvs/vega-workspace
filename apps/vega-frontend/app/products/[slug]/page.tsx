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
import { ArrowLeft, Check } from "lucide-react";

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
      <main className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link href="/products" className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Link>
          <div className="mb-12">
            <div className="label-line mb-4">Category</div>
            <h1 className="section-heading">{category.name}</h1>
            <p className="mt-4 text-gray-500 max-w-lg">
              Browse our {category.name.toLowerCase()} collection.
            </p>
          </div>
          <div className="mb-10 flex flex-wrap gap-2">
            {category.subcategories.map((sub) => (
              <span key={sub} className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-500">
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
    <main className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Link href="/products" className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl bg-gray-100">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product!.image}
                  alt={product!.name}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product!.images.map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                  <img src={img} alt={`${product!.name} ${i + 1}`} className="h-full w-full object-cover" draggable={false} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {product!.category}
            </div>
            <h1 className="section-heading">{product!.name}</h1>
            <p className="mt-2 text-sm text-gray-400">SKU: {product!.sku}</p>
            <p className="mt-5 text-gray-500 leading-relaxed">{product!.description}</p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "Category", value: product!.category },
                    { label: "Subcategory", value: product!.subcategory },
                    { label: "Color", value: product!.color },
                    { label: "Dimensions", value: product!.dimensions },
                    { label: "Weight", value: product!.weight },
                    { label: "Design", value: product!.design },
                    { label: "Fitting", value: product!.fittingType },
                    { label: "Warranty", value: product!.warranty },
                    { label: "Delivery", value: product!.deliveryInfo },
                    { label: "Installation", value: product!.installation },
                    { label: "Bulk Available", value: product!.bulkAvailable ? "Yes" : "No" },
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-gray-50 last:border-b-0">
                      <td className="bg-gray-50/50 px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 w-2/5">
                        {row.label}
                      </td>
                      <td className="px-5 py-3 text-gray-700">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {product!.features.length > 0 && (
              <div className="mt-8">
                <div className="label-line mb-3">Features</div>
                <ul className="space-y-2">
                  {product!.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                      <Check className="h-4 w-4 text-gray-300" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
