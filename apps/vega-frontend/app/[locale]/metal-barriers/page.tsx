import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { LandingPage, buildLandingMetadata, getLandingProductsByCategory } from "@/components/landing";
import { metalBarriersContent } from "@/components/landing/content";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) return {};
  const products = await getLandingProductsByCategory("metal-barriers", 1000);
  return buildLandingMetadata({
    locale: params.locale,
    path: "/metal-barriers",
    title: "Metal Barriers | Commercial Safety & Crowd Control Barriers",
    description:
      "Explore durable metal barriers for events, commercial spaces, construction areas and crowd management. Request a quotation.",
    image: products.find((p) => p.image)?.image || undefined,
    imageAlt: "Heavy duty metal barriers for events and crowd control",
  });
}

export default async function MetalBarriersLandingPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();

  const products = await getLandingProductsByCategory("metal-barriers", 1000);
  const heroProduct = products.find((p) => p.image);

  const content = {
    ...metalBarriersContent,
    hero: {
      ...metalBarriersContent.hero,
      specLines: [
        heroProduct?.dimensions ? `Size: ${heroProduct.dimensions}` : "",
        heroProduct?.sku ? `Model / SKU: ${heroProduct.sku}` : "",
        ...metalBarriersContent.hero.specLines,
      ].filter(Boolean),
    },
  };

  return <LandingPage content={content} products={products} locale={params.locale} />;
}