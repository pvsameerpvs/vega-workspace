import { bunkBedsContent } from "./bunkBeds";
import { metalBarriersContent } from "./metalBarriers";
import { officeFurnitureContent } from "./officeFurniture";
import { queueBarriersContent } from "./queueBarriers";
import { bunkBedsContentAr } from "./ar/bunkBeds";
import { metalBarriersContentAr } from "./ar/metalBarriers";
import { officeFurnitureContentAr } from "./ar/officeFurniture";
import { queueBarriersContentAr } from "./ar/queueBarriers";
import type { LandingContent } from "../types";

export { bunkBedsContent, metalBarriersContent, officeFurnitureContent, queueBarriersContent };
export { bunkBedsContentAr, metalBarriersContentAr, officeFurnitureContentAr, queueBarriersContentAr };
export type { LandingContent } from "../types";

type LandingPageId = "bunk-beds" | "metal-barriers" | "office-furniture" | "queue-barriers";

export function getLandingContent(id: LandingPageId, locale: string): LandingContent {
  const isAR = locale === "ar";
  switch (id) {
    case "bunk-beds":
      return isAR ? bunkBedsContentAr : bunkBedsContent;
    case "metal-barriers":
      return isAR ? metalBarriersContentAr : metalBarriersContent;
    case "office-furniture":
      return isAR ? officeFurnitureContentAr : officeFurnitureContent;
    case "queue-barriers":
      return isAR ? queueBarriersContentAr : queueBarriersContent;
  }
}