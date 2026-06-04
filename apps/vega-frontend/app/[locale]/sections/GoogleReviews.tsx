import { Testimonials } from "./Testimonials";
import { getGoogleReviews as fetchGoogleReviews } from "@/lib/api";

export async function GoogleReviews({ locale = "en" }: { locale?: string }) {
  const reviews = await fetchGoogleReviews();
  return <Testimonials reviews={reviews} locale={locale} />;
}
