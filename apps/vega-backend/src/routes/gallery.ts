import { Router } from "express";
import { db, gallery, MOCK_GALLERY } from "@vega/db";
import { eq, asc, like, and } from "drizzle-orm";
import { getPaginationParams, paginateResponse, filterBySearch, filterByCategory } from "../lib/pagination";

const router = Router();

// GET /api/gallery?page=1&limit=20&search=barrier&category=Camp+Furniture
router.get("/", async (req, res) => {
  try {
    const { page, limit, search, category } = getPaginationParams(req);

    if (db) {
      const conditions = [];
      if (search) conditions.push(like(gallery.title, `%${search}%`));
      if (category) conditions.push(eq(gallery.category, category));

      if (conditions.length === 0) {
        const all = await db.select().from(gallery).orderBy(asc(gallery.displayOrder));
        return res.json(paginateResponse(all, page, limit));
      }
      const all = await db.select().from(gallery).where(and(...conditions)).orderBy(asc(gallery.displayOrder));
      return res.json(paginateResponse(all, page, limit));
    }

    let filtered = [...MOCK_GALLERY];
    if (search) filtered = filterBySearch(filtered, search, ["title", "titleAr", "category"]);
    if (category) filtered = filterByCategory(filtered, category);
    res.json(paginateResponse(filtered, page, limit));
  } catch (error) {
    res.json(paginateResponse(MOCK_GALLERY, 1, 20));
  }
});

router.post("/", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(gallery).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_GALLERY.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create gallery item" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(gallery).set(req.body).where(eq(gallery.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_GALLERY.find((g) => g.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "Gallery item not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update gallery item" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (db) {
      await db.delete(gallery).where(eq(gallery.id, Number(req.params.id)));
      return res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete gallery item" });
  }
});

export default router;
