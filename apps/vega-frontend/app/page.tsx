import {
  HeroSlider,
  AboutStatsSection,
  QualitySection,
  DeliverySection,
  CategoriesSection,
  LeadFormSection,
  ReviewsSection,
  IndustriesSection,
  FaqSection,
  CtaSection,
} from "./sections";

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <AboutStatsSection />
      <QualitySection />
      <DeliverySection />
      <CategoriesSection />
      <LeadFormSection />
      <ReviewsSection />
      <IndustriesSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
