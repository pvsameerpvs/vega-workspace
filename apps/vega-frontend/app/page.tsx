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

export default async function HomePage() {
  const banners = await getBanners();

  return (
    <main>
      <HeroBanner banners={banners} />
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
