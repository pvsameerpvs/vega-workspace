import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  getProductsFiltered,
  mapProductToFrontend,
} from "@/lib/api";
import type { Product } from "@/lib/types";

export async function getLandingProductsByCategory(
  categorySlug: string,
  limit = 16
): Promise<Product[]> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category?.id) return [];
  const products = await getProductsFiltered({ category: String(category.id), limit });
  return (products || []).map(mapProductToFrontend).filter(Boolean) as Product[];
}

export async function getLandingProductsBySubcategory(
  subcategorySlug: string,
  limit = 24
): Promise<Product[]> {
  const subcategory = await getSubcategoryBySlug(subcategorySlug);
  if (!subcategory?.id) return [];
  const products = await getProductsFiltered({ subcategory: String(subcategory.id), limit });
  return (products || []).map(mapProductToFrontend).filter(Boolean) as Product[];
}

export interface LandingProductGroup {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  products: Product[];
}

export async function getLandingProductsGroupedByCategory(
  categorySlug: string,
  limit = 1000
): Promise<{ groups: LandingProductGroup[]; products: Product[] }> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category?.id) return { groups: [], products: [] };
  const flat = await getProductsFiltered({ category: String(category.id), limit });
  const products = (flat || []).map(mapProductToFrontend).filter(Boolean) as Product[];
  const subcategories: { id: string; name: string; nameAr: string; slug: string }[] = Array.isArray(
    category.subcategories
  )
    ? category.subcategories.map((s: any) => ({
        id: String(s.id || s.slug),
        name: s.name || "",
        nameAr: s.nameAr || "",
        slug: s.slug || "",
      }))
    : [];
  const groups: LandingProductGroup[] = subcategories
    .map((sub) => ({ ...sub, products: products.filter((p) => p.subcategorySlug === sub.slug) }))
    .filter((g) => g.products.length > 0);
  const others = products.filter((p) => !subcategories.some((sub) => sub.slug === p.subcategorySlug));
  if (others.length > 0) {
    groups.push({ id: "other", name: "Other Products", nameAr: "منتجات أخرى", slug: "other", products: others });
  }
  return { groups, products };
}

export function pickHeroImage(products: Product[]): string {
  return products.find((p) => p.image)?.image || "";
}