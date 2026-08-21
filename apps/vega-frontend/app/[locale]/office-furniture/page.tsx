import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { LandingPage, buildLandingMetadata, getLandingProductsByCategory } from "@/components/landing";
import { getLandingContent } from "@/components/landing/content";

const ALL_PRODUCTS_LIMIT = 1000;

const META = {
  en: {
    title: "Office Furniture | Professional Commercial Office Furniture",
    description:
      "Explore professional office furniture solutions for modern workplaces, offices and commercial projects. Request a quotation.",
  },
  ar: {
    title: "أثاث مكتبي | أثاث مكاتب احترافي تجاري",
    description:
      "استكشف حلول الأثاث المكتبي الاحترافية لأماكن العمل الحديثة والمكاتب والمشاريع التجارية. اطلب عرض سعر.",
  },
};

export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) return {};
  const products = await getLandingProductsByCategory("office-furniture", ALL_PRODUCTS_LIMIT);
  const meta = META[params.locale as "en" | "ar"] || META.en;
  return buildLandingMetadata({
    locale: params.locale,
    path: "/office-furniture",
    title: meta.title,
    description: meta.description,
    image: products.find((p) => p.image)?.image || undefined,
    imageAlt: meta.title,
  });
}

export default async function OfficeFurnitureLandingPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();

  const products = await getLandingProductsByCategory("office-furniture", ALL_PRODUCTS_LIMIT);
  const heroProduct = products.find((p) => p.image);
  const content = getLandingContent("office-furniture", params.locale);
  const isAR = params.locale === "ar";
  const skuLabel = isAR ? "الموديل / رمز المنتج:" : "Model / SKU:";

  const localized = {
    ...content,
    hero: {
      ...content.hero,
      specLines: [
        heroProduct?.sku ? `${skuLabel} ${heroProduct.sku}` : "",
        ...content.hero.specLines,
      ].filter(Boolean),
    },
    inspiration: content.inspiration
      ? {
          ...content.inspiration,
          image: content.inspiration.image || heroProduct?.image || "",
        }
      : undefined,
  };

  return <LandingPage content={localized} products={products} locale={params.locale} />;
}