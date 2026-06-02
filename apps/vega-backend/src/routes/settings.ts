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
    return res.json({ settings: all, banners, stats, seo });
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

    if (!result.length) {
      return res.status(404).json({ error: "Setting not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update setting" });
  }
});

router.post("/banner", async (req, res) => {
  try {
    const result = await db.insert(homeBanners).values(req.body).returning();
    return res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create banner" });
  }
});

router.put("/banner/:id", async (req, res) => {
  try {
    const result = await db
      .update(homeBanners)
      .set(req.body)
      .where(eq(homeBanners.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Banner not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update banner" });
  }
});

router.delete("/banner/:id", async (req, res) => {
  try {
    await db.delete(homeBanners).where(eq(homeBanners.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete banner" });
  }
});

router.put("/counter/:id", async (req, res) => {
  try {
    const result = await db
      .update(counters)
      .set(req.body)
      .where(eq(counters.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Counter not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update counter" });
  }
});

router.put("/seo/:id", async (req, res) => {
  try {
    const result = await db
      .update(seoMeta)
      .set(req.body)
      .where(eq(seoMeta.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "SEO entry not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update SEO" });
  }
});

export default router;
