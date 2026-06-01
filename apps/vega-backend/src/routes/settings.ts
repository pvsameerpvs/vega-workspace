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

router.post("/banner", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(homeBanners).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_BANNERS.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create banner" });
  }
});

router.put("/banner/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(homeBanners).set(req.body).where(eq(homeBanners.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_BANNERS.find((b) => b.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "Banner not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update banner" });
  }
});

router.delete("/banner/:id", async (req, res) => {
  try {
    if (db) {
      await db.delete(homeBanners).where(eq(homeBanners.id, Number(req.params.id)));
      return res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete banner" });
  }
});

router.put("/counter/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(counters).set(req.body).where(eq(counters.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_COUNTERS.find((c) => c.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "Counter not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update counter" });
  }
});

router.put("/seo/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(seoMeta).set(req.body).where(eq(seoMeta.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_SEO.find((s) => s.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "SEO entry not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update SEO" });
  }
});

export default router;
