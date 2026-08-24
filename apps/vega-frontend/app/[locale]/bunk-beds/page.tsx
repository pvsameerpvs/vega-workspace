import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { LandingPage, buildLandingMetadata, getLandingProductsGroupedByCategory } from "@/components/landing";
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
  const { products } = await getLandingProductsGroupedByCategory("camp-furniture", 1000);
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

  const { groups, products } = await getLandingProductsGroupedByCategory("camp-furniture", 1000);
  const content = getLandingContent("bunk-beds", params.locale);

  return <LandingPage content={content} products={products} groups={groups} locale={params.locale} />;
}