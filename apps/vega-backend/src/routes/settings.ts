import { Router } from "express";
import { db, settings, homeBanners, counters, seoMeta, MOCK_SETTINGS, MOCK_BANNERS, MOCK_COUNTERS, MOCK_SEO } from "@vega/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    if (db) {
      const all = await db.select().from(settings);
      const banners = await db.select().from(homeBanners);
      const stats = await db.select().from(counters);
      const seo = await db.select().from(seoMeta);
      return res.json({ settings: all, banners, stats, seo });
    }
    res.json({ settings: MOCK_SETTINGS, banners: MOCK_BANNERS, stats: MOCK_COUNTERS, seo: MOCK_SEO });
  } catch (error) {
    res.json({ settings: MOCK_SETTINGS, banners: MOCK_BANNERS, stats: MOCK_COUNTERS, seo: MOCK_SEO });
  }
});

router.put("/:key", async (req, res) => {
  try {
    if (db) {
      const result = await db
        .update(settings)
        .set({ value: req.body.value })
        .where(eq(settings.key, req.params.key))
        .returning();
      return res.json(result[0]);
    }
    const found = MOCK_SETTINGS.find((s) => s.key === req.params.key);
    if (!found) return res.status(404).json({ error: "Setting not found" });
    res.json({ ...found, value: req.body.value });
  } catch (error) {
    res.status(500).json({ error: "Failed to update setting" });
  }
});

export default router;
