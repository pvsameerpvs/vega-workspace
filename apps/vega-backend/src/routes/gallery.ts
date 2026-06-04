import { Router } from "express";
import { db, gallery } from "@vega/db";
import { eq, asc, like, and } from "drizzle-orm";
import { authenticate } from "../middleware/auth";
import { cleanBody } from "../lib/utils";
import {
  getPaginationParams,
  paginateResponse,
  filterBySearch,
  filterByCategory,
} from "../lib/pagination";

const router = Router();

// GET /api/gallery?page=1&limit=20&search=barrier&category=Camp+Furniture
router.get("/", async (req, res) => {
  try {
    const { page, limit, search, category } = getPaginationParams(req);
    const conditions = [];

    if (search) conditions.push(like(gallery.title, `%${search}%`));
    if (category) conditions.push(eq(gallery.category, category));

    if (conditions.length === 0) {
      const all = await db
        .select()
        .from(gallery)
        .orderBy(asc(gallery.displayOrder));
      return res.json(paginateResponse(all, page, limit));
    }

    const all = await db
      .select()
      .from(gallery)
      .where(and(...conditions))
      .orderBy(asc(gallery.displayOrder));
    return res.json(paginateResponse(all, page, limit));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const result = await db.insert(gallery).values(cleanBody(req.body)).returning();
    return res.status(201).json(result[0]);
  } catch (error: any) {
    console.error("Create gallery error:", error);
    res.status(500).json({ error: error.message || "Failed to create gallery item" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const result = await db
      .update(gallery)
      .set(cleanBody(req.body))
      .where(eq(gallery.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Gallery item not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update gallery item" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await db.delete(gallery).where(eq(gallery.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete gallery item" });
  }
});

export default router;
