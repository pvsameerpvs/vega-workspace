import { Router } from "express";
import { db, settings, homeBanners, counters, seoMeta } from "@vega/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const all = await db.select().from(settings);
    const banners = await db.select().from(homeBanners);
    const stats = await db.select().from(counters);
    const seo = await db.select().from(seoMeta);
    res.json({ settings: all, banners, stats, seo });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

router.put("/:key", async (req, res) => {
  try {
    const result = await db
      .update(settings)
      .set({ value: req.body.value })
      .where(eq(settings.key, req.params.key))
      .returning();
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update setting" });
  }
});

export default router;
