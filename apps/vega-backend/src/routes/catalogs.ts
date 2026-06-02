import { Router } from "express";
import { db, catalogs } from "@vega/db";
import { eq, desc, like, and } from "drizzle-orm";
import {
  getPaginationParams,
  paginateResponse,
  filterBySearch,
  filterByCategory,
} from "../lib/pagination";

const router = Router();

// GET /api/catalogs?page=1&limit=20&search=office&category=Camp+Furniture
router.get("/", async (req, res) => {
  try {
    const { page, limit, search, category } = getPaginationParams(req);
    const conditions = [];

    if (search) conditions.push(like(catalogs.title, `%${search}%`));
    if (category) conditions.push(eq(catalogs.category, category));

    if (conditions.length === 0) {
      const all = await db
        .select()
        .from(catalogs)
        .orderBy(desc(catalogs.createdAt));
      return res.json(paginateResponse(all, page, limit));
    }

    const all = await db
      .select()
      .from(catalogs)
      .where(and(...conditions))
      .orderBy(desc(catalogs.createdAt));
    return res.json(paginateResponse(all, page, limit));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch catalogs" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.insert(catalogs).values(req.body).returning();
    return res.status(201).json(result[0]);
  } catch (error: any) {
    console.error("Create catalog error:", error);
    res.status(500).json({ error: error.message || "Failed to create catalog" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await db
      .update(catalogs)
      .set(req.body)
      .where(eq(catalogs.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Catalog not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update catalog" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.delete(catalogs).where(eq(catalogs.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete catalog" });
  }
});

export default router;
