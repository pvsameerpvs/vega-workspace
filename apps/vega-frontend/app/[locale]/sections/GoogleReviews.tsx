import { Testimonials } from "./Testimonials";
import { getGoogleReviews as fetchGoogleReviews } from "@/lib/api";

export async function GoogleReviews({ locale = "en" }: { locale?: string }) {
  try {
    const reviews = await fetchGoogleReviews();
    if (!reviews || (Array.isArray(reviews) && reviews.length === 0)) return null;
    return <Testimonials reviews={reviews} locale={locale} />;
  } catch {
    return null;
  }
}
