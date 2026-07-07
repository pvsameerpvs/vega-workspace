import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  resolveProductPath,
  getProductsByCategory,
  getProductsBySubcategory,
  mapProductToFrontend,
  mapCategoryToFrontend,
} from "@/lib/api";
import { ProductDetailPage } from "@/components/product/ProductDetailPage";
import { CategoryPage } from "@/components/product/CategoryPage";
import { SubcategoryPage } from "@/components/product/SubcategoryPage";
import { isValidLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[]; locale: string };
}): Promise<Metadata> {
  const path = params.slug.join("/");
  const resolved = await resolveProductPath(path);
  const isAR = params.locale === "ar";

  if (resolved?.type === "product") {
    const p = resolved.data;
    const name = isAR && p.nameAr ? p.nameAr : p.name;
    return {
      title: `${name} | Vega UAE`,
      description: p.shortDescriptionAr || p.shortDescription || p.fullDescription,
    };
  }

  if (resolved?.type === "category") {
    const c = resolved.data;
    const name = isAR && c.nameAr ? c.nameAr : c.name;
    return {
      title: `${name} | Vega UAE`,
      description: c.description || `Browse our ${c.name} collection.`,
    };
  }

  if (resolved?.type === "subcategory") {
    const s = resolved.data;
    const name = isAR && s.nameAr ? s.nameAr : s.name;
    return {
      title: `${name} | Vega UAE`,
      description: `Browse ${s.name} products.`,
    };
  }

  return {
    title: "Product | Vega UAE",
    description: "Product details page with specifications and enquiry options.",
  };
}

export default async function ProductsCatchAllPage({
  params,
}: {
  params: { slug: string[]; locale: string };
}) {
  if (!isValidLocale(params.locale)) notFound();

  const path = params.slug.join("/");
  const resolved = await resolveProductPath(path);

  if (!resolved || !resolved.data) {
    notFound();
  }

  const { type, data } = resolved;

  // Product page
  if (type === "product") {
    const product = mapProductToFrontend(data);
    if (!product) notFound();

    return (
      <ProductDetailPage
        product={product}
        locale={params.locale}
      />
    );
  }

  // Category page
  if (type === "category") {
    const category = mapCategoryToFrontend(data);
    if (!category) notFound();

    const products = await getProductsByCategory(Number(data.id));
    const mappedProducts = (products || [])
      .map(mapProductToFrontend)
      .filter(Boolean) as any[];

    return (
      <CategoryPage
        category={category}
        products={mappedProducts}
        locale={params.locale}
      />
    );
  }

  // Subcategory page
  if (type === "subcategory") {
    const products = await getProductsBySubcategory(Number(data.id));
    const mappedProducts = (products || [])
      .map(mapProductToFrontend)
      .filter(Boolean) as any[];

    return (
      <SubcategoryPage
        subcategory={{
          id: data.id,
          name: data.name,
          nameAr: data.nameAr,
          slug: data.slug,
          categorySlug: data.categorySlug,
          categoryName: data.categoryName,
          categoryNameAr: data.categoryNameAr,
        }}
        products={mappedProducts}
        locale={params.locale}
      />
    );
  }

  notFound();
}
