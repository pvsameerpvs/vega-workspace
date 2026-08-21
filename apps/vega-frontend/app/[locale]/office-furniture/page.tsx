import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { LandingPage, buildLandingMetadata, getLandingProductsByCategory } from "@/components/landing";
import { officeFurnitureContent } from "@/components/landing/content";

const ALL_PRODUCTS_LIMIT = 1000;

export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) return {};
  const products = await getLandingProductsByCategory("office-furniture", ALL_PRODUCTS_LIMIT);
  return buildLandingMetadata({
    locale: params.locale,
    path: "/office-furniture",
    title: "Office Furniture | Professional Commercial Office Furniture",
    description:
      "Explore professional office furniture solutions for modern workplaces, offices and commercial projects. Request a quotation.",
    image: products.find((p) => p.image)?.image || undefined,
    imageAlt: "Professional office furniture for commercial workspaces",
  });
}

export default async function OfficeFurnitureLandingPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();

  const products = await getLandingProductsByCategory("office-furniture", ALL_PRODUCTS_LIMIT);
  const heroProduct = products.find((p) => p.image);

  const content = {
    ...officeFurnitureContent,
    hero: {
      ...officeFurnitureContent.hero,
      specLines: [
        heroProduct?.sku ? `Model / SKU: ${heroProduct.sku}` : "",
        ...officeFurnitureContent.hero.specLines,
      ].filter(Boolean),
    },
    inspiration: officeFurnitureContent.inspiration
      ? {
          ...officeFurnitureContent.inspiration,
          image: officeFurnitureContent.inspiration.image || heroProduct?.image || "",
        }
      : undefined,
  };

  return <LandingPage content={content} products={products} locale={params.locale} />;
}