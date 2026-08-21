import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { LandingPage, buildLandingMetadata, getLandingProductsBySubcategory } from "@/components/landing";
import { getLandingContent } from "@/components/landing/content";

const META = {
  en: {
    title: "Bunk Beds | Commercial & Accommodation Bunk Bed Solutions",
    description:
      "Explore durable bunk bed solutions for hostels, dormitories, worker accommodation, institutions and commercial projects. Request a quotation.",
  },
  ar: {
    title: "أسرة طابقية | حلول أسرة طابقية تجارية ولسكنات العمل",
    description:
      "استكشف حلول الأسرة الطابقية المتينة للمهاجع والسكن الطلابي وإسكان العمال والمؤسسات والمشاريع التجارية. اطلب عرض سعر.",
  },
};

export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) return {};
  const products = await getLandingProductsBySubcategory("bunk-beds", 1000);
  const meta = META[params.locale as "en" | "ar"] || META.en;
  return buildLandingMetadata({
    locale: params.locale,
    path: "/bunk-beds",
    title: meta.title,
    description: meta.description,
    image: products.find((p) => p.image)?.image || undefined,
    imageAlt: meta.title,
  });
}

export default async function BunkBedsLandingPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();

  const products = await getLandingProductsBySubcategory("bunk-beds", 1000);
  const heroProduct = products.find((p) => p.image);
  const content = getLandingContent("bunk-beds", params.locale);
  const isAR = params.locale === "ar";
  const dimLabel = isAR ? "الأبعاد:" : "Dimensions:";
  const skuLabel = isAR ? "الموديل / رمز المنتج:" : "Model / SKU:";

  const localized = {
    ...content,
    hero: {
      ...content.hero,
      specLines: [
        heroProduct?.dimensions ? `${dimLabel} ${heroProduct.dimensions}` : "",
        heroProduct?.sku ? `${skuLabel} ${heroProduct.sku}` : "",
        ...content.hero.specLines,
      ].filter(Boolean),
    },
  };

  return <LandingPage content={localized} products={products} locale={params.locale} />;
}