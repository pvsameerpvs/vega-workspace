import { Product } from "@/lib/types";

export function getProductUrl(product: Product, locale: string): string {
  const base = `/${locale}/products`;
  if (product.subcategorySlug && product.categorySlug) {
    return `${base}/${product.categorySlug}/${product.subcategorySlug}/${product.slug}`;
  }
  if (product.categorySlug) {
    return `${base}/${product.categorySlug}/${product.slug}`;
  }
  return `${base}/${product.slug}`;
}

export function getCategoryUrl(categorySlug: string, locale: string): string {
  return `/${locale}/products/${categorySlug}`;
}

export function getSubcategoryUrl(categorySlug: string, subcategorySlug: string, locale: string): string {
  return `/${locale}/products/${categorySlug}/${subcategorySlug}`;
}
