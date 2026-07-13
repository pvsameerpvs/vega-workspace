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
  OurClients,
} from "./sections";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getHomepageConfig } from "@/lib/api";

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();

  const config = await getHomepageConfig();
  const visibility = config?.sectionVisibility ?? {};

  return (
    <main>
      {visibility.heroBanner !== false && <HeroBanner locale={locale} />}
      <TrustBar locale={locale} />
      <PromoBanner locale={locale} />
      {visibility.popularCategories !== false && <PopularCategories locale={locale} />}
      {visibility.featuredProducts !== false && <FeaturedProducts locale={locale} />}
      {visibility.spotlight !== false && <SpotlightSection locale={locale} />}
      {visibility.categoryShowcases !== false && <CategoryShowcases locale={locale} />}
      <FeaturesSection locale={locale} />
      <OurClients locale={locale} />
      {visibility.bestSellers !== false && <BestSellers locale={locale} />}
      {visibility.newArrivals !== false && <NewArrivals locale={locale} />}
      {visibility.productRanges !== false && <ProductRanges locale={locale} />}
      {visibility.limitedDeals !== false && <LimitedDeals locale={locale} />}
      {visibility.recentViewed !== false && <RecentViewed locale={locale} />}
      {visibility.testimonials !== false && <GoogleReviews locale={locale} />}
      <BusinessSolutions locale={locale} />
      <ContactFormSection locale={locale} />
      {visibility.seoContent !== false && <SeoContent locale={locale} />}
      {visibility.faqSection !== false && <FaqSection locale={locale} />}
    </main>
  );
}
