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

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();

  return (
    <main>
      <HeroBanner locale={locale} />
      <TrustBar locale={locale} />
      <PromoBanner locale={locale} />
      <PopularCategories locale={locale} />
      <FeaturedProducts locale={locale} />
      <SpotlightSection locale={locale} />
      <CategoryShowcases locale={locale} />
      <FeaturesSection locale={locale} />
      <OurClients locale={locale} />
      <BestSellers locale={locale} />
      <NewArrivals locale={locale} />
      <ProductRanges locale={locale} />
      <LimitedDeals locale={locale} />
      <RecentViewed locale={locale} />
      <GoogleReviews locale={locale} />
      <BusinessSolutions locale={locale} />
      <ContactFormSection locale={locale} />
      <SeoContent locale={locale} />
      <FaqSection locale={locale} />
    </main>
  );
}
