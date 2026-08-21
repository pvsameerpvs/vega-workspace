import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { LandingPage, buildLandingMetadata, getLandingProductsBySubcategory } from "@/components/landing";
import { bunkBedsContent } from "@/components/landing/content";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) return {};
  const products = await getLandingProductsBySubcategory("bunk-beds", 1000);
  return buildLandingMetadata({
    locale: params.locale,
    path: "/bunk-beds",
    title: "Bunk Beds | Commercial & Accommodation Bunk Bed Solutions",
    description:
      "Explore durable bunk bed solutions for hostels, dormitories, worker accommodation, institutions and commercial projects. Request a quotation.",
    image: products.find((p) => p.image)?.image || undefined,
    imageAlt: "Commercial bunk beds for accommodation projects",
  });
}

export default async function BunkBedsLandingPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();

  const products = await getLandingProductsBySubcategory("bunk-beds", 1000);
  const heroProduct = products.find((p) => p.image);

  const content = {
    ...bunkBedsContent,
    hero: {
      ...bunkBedsContent.hero,
      specLines: [
        heroProduct?.dimensions ? `Dimensions: ${heroProduct.dimensions}` : "",
        heroProduct?.sku ? `Model / SKU: ${heroProduct.sku}` : "",
        ...bunkBedsContent.hero.specLines,
      ].filter(Boolean),
    },
  };

  return <LandingPage content={content} products={products} locale={params.locale} />;
}