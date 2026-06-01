import { Router } from "express";
import { db, blogs, MOCK_BLOGS } from "@vega/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    if (db) {
      const all = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
      return res.json(all);
    }
    res.json(MOCK_BLOGS);
  } catch (error) {
    res.json(MOCK_BLOGS);
  }
});

router.get("/:slug", async (req, res) => {
  try {
    if (db) {
      const result = await db.select().from(blogs).where(eq(blogs.slug, req.params.slug)).limit(1);
      if (!result.length) return res.status(404).json({ error: "Blog not found" });
      return res.json(result[0]);
    }
    const found = MOCK_BLOGS.find((b) => b.slug === req.params.slug);
    if (!found) return res.status(404).json({ error: "Blog not found" });
    res.json(found);
  } catch (error) {
    const found = MOCK_BLOGS.find((b) => b.slug === req.params.slug);
    if (!found) return res.status(404).json({ error: "Blog not found" });
    res.json(found);
  }
});

router.post("/", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(blogs).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_BLOGS.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (db) {
      await db.delete(blogs).where(eq(blogs.id, Number(req.params.id)));
      return res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

export default router;
