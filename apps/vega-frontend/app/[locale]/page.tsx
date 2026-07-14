import dynamic from "next/dynamic";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getHomepageConfig, getBanners } from "@/lib/api";

import { HeroBanner, TrustBar, PromoBanner, PopularCategories, FeaturedProducts, SpotlightSection, BusinessSolutions, CategoryShowcases, BestSellers, NewArrivals, ProductRanges, FeaturesSection } from "./sections";

const LimitedDeals = dynamic(() => import("./sections").then((m) => ({ default: m.LimitedDeals })));
const RecentViewed = dynamic(() => import("./sections").then((m) => ({ default: m.RecentViewed })));
const GoogleReviews = dynamic(() => import("./sections").then((m) => ({ default: m.GoogleReviews })));
const ContactFormSection = dynamic(() => import("./sections").then((m) => ({ default: m.ContactFormSection })));
const SeoContent = dynamic(() => import("./sections").then((m) => ({ default: m.SeoContent })));
const FaqSection = dynamic(() => import("./sections").then((m) => ({ default: m.FaqSection })));
const OurClients = dynamic(() => import("./sections").then((m) => ({ default: m.OurClients })));

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();

  const [config, banners] = await Promise.all([
    getHomepageConfig(),
    getBanners(),
  ]);
  const visibility = config?.sectionVisibility ?? {};

  return (
    <main>
      {visibility.heroBanner !== false && <HeroBanner banners={banners} locale={locale} />}
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
