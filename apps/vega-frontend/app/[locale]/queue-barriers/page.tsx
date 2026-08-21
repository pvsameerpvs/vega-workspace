import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { LandingPage, buildLandingMetadata, getLandingProductsByCategory } from "@/components/landing";
import { queueBarriersContent } from "@/components/landing/content";

const ALL_PRODUCTS_LIMIT = 1000;

export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) return {};
  const products = await getLandingProductsByCategory("queue-barriers", ALL_PRODUCTS_LIMIT);
  return buildLandingMetadata({
    locale: params.locale,
    path: "/queue-barriers",
    title: "Queue Barriers | Professional Queue Management Solutions",
    description:
      "Explore professional queue barrier solutions for organized customer flow in commercial and public environments. Request a quotation.",
    image: products.find((p) => p.image)?.image || undefined,
    imageAlt: "Queue stanchions and belt barriers for customer flow management",
  });
}

export default async function QueueBarriersLandingPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();

  const products = await getLandingProductsByCategory("queue-barriers", ALL_PRODUCTS_LIMIT);
  const heroProduct = products.find((p) => p.image);

  const content = {
    ...queueBarriersContent,
    hero: {
      ...queueBarriersContent.hero,
      specLines: [
        heroProduct?.dimensions ? `Size: ${heroProduct.dimensions}` : "",
        heroProduct?.sku ? `Model / SKU: ${heroProduct.sku}` : "",
        ...queueBarriersContent.hero.specLines,
      ].filter(Boolean),
    },
  };

  return <LandingPage content={content} products={products} locale={params.locale} />;
}