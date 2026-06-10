import {
  HeroBanner,
  TrustBar,
  PromoBanner,
  PopularCategories,
  FeaturedProducts,
  SpotlightSection,
  BusinessSolutions,
  CategoryShowcases,
  BestSellers,
  NewArrivals,
  ProductRanges,
  LimitedDeals,
  RecentViewed,
  GoogleReviews,
  ContactFormSection,
  SeoContent,
  FaqSection,
  FeaturesSection,
} from "./sections";
import { getBanners, getHomepageConfig } from "@/lib/api";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  const [banners, config] = await Promise.all([getBanners(), getHomepageConfig()]);

  const visibility = config?.sectionVisibility || {};
  const isVisible = (key: string) => visibility[key] !== false;

  return (
    <main>
      {isVisible("heroBanner") && <HeroBanner banners={banners} locale={locale} />}
       <TrustBar locale={locale} />
      
     
      <PromoBanner locale={locale} />
      {isVisible("popularCategories") && <PopularCategories locale={locale} />}
      {isVisible("featuredProducts") && <FeaturedProducts locale={locale} />}
      {isVisible("spotlight") && <SpotlightSection locale={locale} />}
      
      {isVisible("categoryShowcases") && <CategoryShowcases locale={locale} />}
      <FeaturesSection locale={locale} />
      {isVisible("bestSellers") && <BestSellers locale={locale} />}
      {isVisible("newArrivals") && <NewArrivals locale={locale} />}
      {isVisible("productRanges") && <ProductRanges locale={locale} />}
      {isVisible("limitedDeals") && <LimitedDeals locale={locale} />}
      {isVisible("recentViewed") && <RecentViewed locale={locale} />}
      {isVisible("testimonials") && <GoogleReviews locale={locale} />}
      <BusinessSolutions locale={locale} />
      <ContactFormSection locale={locale} />
      {isVisible("seoContent") && <SeoContent locale={locale} />}
      {isVisible("faqSection") && <FaqSection locale={locale} />}
    </main>
  );
}
