import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { LandingPage, buildLandingMetadata, getLandingProductsGroupedByCategory } from "@/components/landing";
import { getLandingContent } from "@/components/landing/content";

const ALL_PRODUCTS_LIMIT = 1000;

const META = {
  en: {
    title: "Queue Barriers | Professional Queue Management Solutions",
    description:
      "Explore professional queue barrier solutions for organized customer flow in commercial and public environments. Request a quotation.",
  },
  ar: {
    title: "حواجز الطوابير | حلول إدارة الطوابير الاحترافية",
    description:
      "استكشف حلول حواجز الطوابير الاحترافية لتدفق العملاء المنظم في البيئات التجارية والعامة. اطلب عرض سعر.",
  },
};

export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) return {};
  const { products } = await getLandingProductsGroupedByCategory("queue-barriers", ALL_PRODUCTS_LIMIT);
  const meta = META[params.locale as "en" | "ar"] || META.en;
  return buildLandingMetadata({
    locale: params.locale,
    path: "/queue-barriers",
    title: meta.title,
    description: meta.description,
    image: products.find((p) => p.image)?.image || undefined,
    imageAlt: meta.title,
  });
}

export default async function QueueBarriersLandingPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();

  const { groups, products } = await getLandingProductsGroupedByCategory("queue-barriers", ALL_PRODUCTS_LIMIT);
  const heroProduct = products.find((p) => p.image);
  const content = getLandingContent("queue-barriers", params.locale);
  const isAR = params.locale === "ar";
  const sizeLabel = isAR ? "المقاس:" : "Size:";
  const skuLabel = isAR ? "الموديل / رمز المنتج:" : "Model / SKU:";

  const localized = {
    ...content,
    hero: {
      ...content.hero,
      specLines: [
        heroProduct?.dimensions ? `${sizeLabel} ${heroProduct.dimensions}` : "",
        heroProduct?.sku ? `${skuLabel} ${heroProduct.sku}` : "",
        ...content.hero.specLines,
      ].filter(Boolean),
    },
  };

  return <LandingPage content={localized} products={products} groups={groups} locale={params.locale} />;
}