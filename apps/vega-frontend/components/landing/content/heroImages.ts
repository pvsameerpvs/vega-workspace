export type LandingPageId = "bunk-beds" | "metal-barriers" | "office-furniture" | "queue-barriers";

const BASE = "/images/landing-page";

const HERO_IMAGES: Record<LandingPageId, string[]> = {
  "bunk-beds": [
    `${BASE}/bunk-beds/BunkBeds-1.jpeg`,
    `${BASE}/bunk-beds/BunkBeds-2.jpeg`,
    `${BASE}/bunk-beds/BunkBeds-3.jpeg`,
    `${BASE}/bunk-beds/BunkBeds-4.jpeg`,
    `${BASE}/bunk-beds/BunkBeds-5.jpeg`,
  ],
  "metal-barriers": [
    `${BASE}/metal-barriers/metal-barrier1.jpeg`,
    `${BASE}/metal-barriers/metal-barrier2.jpeg`,
    `${BASE}/metal-barriers/metal-barrier3.jpeg`,
    `${BASE}/metal-barriers/metal-barrier4.jpeg`,
    `${BASE}/metal-barriers/metal-barrier5.jpeg`,
    `${BASE}/metal-barriers/metal-barrier6.jpeg`,
  ],
  "office-furniture": [
    `${BASE}/office-furniture/office-furniture1.jpeg`,
    `${BASE}/office-furniture/office-furniture2.jpeg`,
    `${BASE}/office-furniture/office-furniture3.jpeg`,
    `${BASE}/office-furniture/office-furniture4.jpeg`,
    `${BASE}/office-furniture/office-furniture5.jpeg`,
  ],
  "queue-barriers": [
    `${BASE}/queue-barriers/queue-barrier1.jpeg`,
    `${BASE}/queue-barriers/queue-barrier2.jpeg`,
    `${BASE}/queue-barriers/queue-barrier3.jpeg`,
    `${BASE}/queue-barriers/queue-barrier4.jpeg`,
    `${BASE}/queue-barriers/queue-barrier5.jpeg`,
  ],
};

export function getLandingHeroImages(id: LandingPageId): string[] {
  return HERO_IMAGES[id] || [];
}