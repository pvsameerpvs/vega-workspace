import { Router } from "express";
import { db, blogs } from "@vega/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const all = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const result = await db.select().from(blogs).where(eq(blogs.slug, req.params.slug)).limit(1);
    if (!result.length) return res.status(404).json({ error: "Blog not found" });
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.insert(blogs).values(req.body).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
});

export default router;
