import { Router } from "express";
import { db, blogs, MOCK_BLOGS } from "@vega/db";
import { eq, desc, like, and, or } from "drizzle-orm";
import { getPaginationParams, paginateResponse, filterBySearch, filterByStatus } from "../lib/pagination";

const router = Router();

// GET /api/blog?page=1&limit=20&search=office&status=published
router.get("/", async (req, res) => {
  try {
    const { page, limit, search, status } = getPaginationParams(req);

    if (db) {
      const conditions = [];
      if (search) {
        conditions.push(
          or(
            like(blogs.title, `%${search}%`),
            like(blogs.slug, `%${search}%`),
            like(blogs.category, `%${search}%`)
          )
        );
      }
      if (status) conditions.push(eq(blogs.status, status as any));

      if (conditions.length === 0) {
        const all = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
        return res.json(paginateResponse(all, page, limit));
      }
      const all = await db.select().from(blogs).where(and(...conditions)).orderBy(desc(blogs.createdAt));
      return res.json(paginateResponse(all, page, limit));
    }

    let filtered = [...MOCK_BLOGS];
    if (search) filtered = filterBySearch(filtered, search, ["title", "titleAr", "category", "excerpt"]);
    if (status) filtered = filterByStatus(filtered, status);
    res.json(paginateResponse(filtered, page, limit));
  } catch (error) {
    res.json(paginateResponse(MOCK_BLOGS, 1, 20));
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

router.put("/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(blogs).set(req.body).where(eq(blogs.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_BLOGS.find((b) => b.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "Blog not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog" });
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
