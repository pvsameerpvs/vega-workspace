import { Router } from "express";
import { db, blogs } from "@vega/db";
import { eq, desc, like, and, or } from "drizzle-orm";
import { authenticate } from "../middleware/auth";
import { cleanBody } from "../lib/utils";
import { getPaginationParams, paginateResponse } from "../lib/pagination";
import { blogSchema, ensureBlogSlug, normalizeBlogDates } from "./blog.utils";

const router = Router();

// GET /api/blog?page=1&limit=20&search=office&status=published
router.get("/", async (req, res) => {
  try {
    const { page, limit, search, status } = getPaginationParams(req);
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
      const all = await db
        .select()
        .from(blogs)
        .orderBy(desc(blogs.createdAt));
      return res.json(paginateResponse(all, page, limit));
    }

    const all = await db
      .select()
      .from(blogs)
      .where(and(...conditions))
      .orderBy(desc(blogs.createdAt));

    return res.json(paginateResponse(all, page, limit));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const result = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, req.params.slug))
      .limit(1);

    if (!result.length) {
      return res.status(404).json({ error: "Blog not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const parsed = blogSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors.map((e) => e.message).join(", ") });
    }
    const body = normalizeBlogDates(ensureBlogSlug(cleanBody(parsed.data)));
    if (!body.title || !body.slug) {
      return res.status(400).json({ error: "Title and slug are required" });
    }
    const result = await db.insert(blogs).values(body).returning();
    return res.status(201).json(result[0]);
  } catch (error: any) {
    console.error("Create blog error:", error);
    res.status(500).json({ error: error.message || "Failed to create blog" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const parsed = blogSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors.map((e) => e.message).join(", ") });
    }
    const body = normalizeBlogDates(ensureBlogSlug(cleanBody(parsed.data)));
    const result = await db
      .update(blogs)
      .set(body)
      .where(eq(blogs.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Blog not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await db.delete(blogs).where(eq(blogs.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

export default router;
