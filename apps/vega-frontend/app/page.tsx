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

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <TrustBar />
      <PromoBanner />
      <PopularCategories />
      <FeaturedProducts />
      <SpotlightSection />
      <BusinessSolutions />
      <BestSellers />
      <NewArrivals />
      <ProductRanges />
      <LimitedDeals />
      <RecentViewed />
      <Testimonials />
      <SeoContent />
      <FaqSection />
    </main>
  );
}
