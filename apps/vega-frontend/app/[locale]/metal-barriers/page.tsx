import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { LandingPage, buildLandingMetadata, getLandingProductsGroupedByCategory } from "@/components/landing";
import { getLandingContent } from "@/components/landing/content";

const META = {
  en: {
    title: "Metal Barriers | Commercial Safety & Crowd Control Barriers",
    description:
      "Explore durable metal barriers for events, commercial spaces, construction areas and crowd management. Request a quotation.",
  },
  ar: {
    title: "حواجز معدنية | حواجز سلامة وتحكم في الحشود للاستخدام التجاري",
    description:
      "استكشف الحواجز المعدنية المتينة للفعاليات والمساحات التجارية ومواقع الإنشاءات وإدارة الحشود. اطلب عرض سعر.",
  },
};

export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) return {};
  const { products } = await getLandingProductsGroupedByCategory("metal-barriers", 1000);
  const meta = META[params.locale as "en" | "ar"] || META.en;
  return buildLandingMetadata({
    locale: params.locale,
    path: "/metal-barriers",
    title: meta.title,
    description: meta.description,
    image: products.find((p) => p.image)?.image || undefined,
    imageAlt: meta.title,
  });
}

export default async function MetalBarriersLandingPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();

  const { groups, products } = await getLandingProductsGroupedByCategory("metal-barriers", 1000);
  const content = getLandingContent("metal-barriers", params.locale);

  return <LandingPage content={content} products={products} groups={groups} locale={params.locale} />;
}