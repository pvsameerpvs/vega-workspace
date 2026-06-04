import { Router } from "express";

interface GoogleReview {
  name: string;
  rating: number;
  text: string;
  time: string;
  profilePhotoUrl?: string;
}

let cachedReviews: GoogleReview[] | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const router = Router();

router.get("/", async (_req, res) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(500).json({ error: "Google Places API key or place ID not configured" });
  }

  // Return cached if fresh
  if (cachedReviews && Date.now() - cachedAt < CACHE_TTL_MS) {
    return res.json({ reviews: cachedReviews, cached: true });
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "Content-Type": "application/json",
          "Referer": process.env.GOOGLE_REFERER || "https://vega.ae",
        },
      }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => "Unknown error");
      console.error("[Google Reviews] API error:", response.status, text);
      return res.status(response.status).json({ error: "Failed to fetch Google reviews", details: text });
    }

    const data = await response.json();
    const reviews: GoogleReview[] = (data.reviews || [])
      .map((review: any) => ({
        name: review.authorAttribution?.displayName || "Google User",
        rating: review.rating || 5,
        text: review.text?.text || "",
        time: review.publishTime || "",
        profilePhotoUrl: review.authorAttribution?.photoUri || "",
      }))
      .filter((r: GoogleReview) => r.text.length > 0);

    cachedReviews = reviews;
    cachedAt = Date.now();

    return res.json({ reviews, rating: data.rating, userRatingCount: data.userRatingCount });
  } catch (error: any) {
    console.error("[Google Reviews] Fetch failed:", error);
    return res.status(500).json({ error: "Failed to fetch Google reviews", message: error.message });
  }
});

export default router;
