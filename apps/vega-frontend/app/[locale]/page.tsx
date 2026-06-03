import {
  HeroBanner,
  TrustBar,
  PromoBanner,
  PopularCategories,
  FeaturedProducts,
  SpotlightSection,
  BusinessSolutions,
  BestSellers,
  NewArrivals,
  ProductRanges,
  LimitedDeals,
  RecentViewed,
  Testimonials,
  SeoContent,
  FaqSection,
} from "./sections";
import { getBanners } from "@/lib/api";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  const banners = await getBanners();

  return (
    <main>
      <HeroBanner banners={banners} locale={locale} />
      <TrustBar locale={locale} />
      <PromoBanner locale={locale} />
      <PopularCategories locale={locale} />
      <FeaturedProducts locale={locale} />
      <SpotlightSection locale={locale} />
      <BusinessSolutions locale={locale} />
      <BestSellers locale={locale} />
      <NewArrivals locale={locale} />
      <ProductRanges locale={locale} />
      <LimitedDeals locale={locale} />
      <RecentViewed locale={locale} />
      <Testimonials locale={locale} />
      <SeoContent locale={locale} />
      <FaqSection locale={locale} />
    </main>
  );
}
