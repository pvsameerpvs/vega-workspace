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

export function pickHeroImage(products: Product[]): string {
  return products.find((p) => p.image)?.image || "";
}