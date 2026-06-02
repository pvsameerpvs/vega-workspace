import { Router } from "express";
import { db, catalogs, MOCK_CATALOGS } from "@vega/db";
import { eq, desc, like, and } from "drizzle-orm";
import { getPaginationParams, paginateResponse, filterBySearch, filterByCategory } from "../lib/pagination";

const router = Router();

// GET /api/catalogs?page=1&limit=20&search=office&category=Camp+Furniture
router.get("/", async (req, res) => {
  try {
    const { page, limit, search, category } = getPaginationParams(req);

    if (db) {
      const conditions = [];
      if (search) conditions.push(like(catalogs.title, `%${search}%`));
      if (category) conditions.push(eq(catalogs.category, category));

      if (conditions.length === 0) {
        const all = await db.select().from(catalogs).orderBy(desc(catalogs.createdAt));
        return res.json(paginateResponse(all, page, limit));
      }
      const all = await db.select().from(catalogs).where(and(...conditions)).orderBy(desc(catalogs.createdAt));
      return res.json(paginateResponse(all, page, limit));
    }

    let filtered = [...MOCK_CATALOGS];
    if (search) filtered = filterBySearch(filtered, search, ["title", "titleAr", "category"]);
    if (category) filtered = filterByCategory(filtered, category);
    res.json(paginateResponse(filtered, page, limit));
  } catch (error) {
    res.json(paginateResponse(MOCK_CATALOGS, 1, 20));
  }
});

router.post("/", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(catalogs).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_CATALOGS.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create catalog" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(catalogs).set(req.body).where(eq(catalogs.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_CATALOGS.find((c) => c.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "Catalog not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update catalog" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (db) {
      await db.delete(catalogs).where(eq(catalogs.id, Number(req.params.id)));
      return res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete catalog" });
  }
});

export default router;
