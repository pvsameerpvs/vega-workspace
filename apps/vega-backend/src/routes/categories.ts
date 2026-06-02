import { Router } from "express";
import { db, categories, subcategories } from "@vega/db";
import { eq, asc } from "drizzle-orm";
import {
  getPaginationParams,
  paginateResponse,
  filterBySearch,
} from "../lib/pagination";

const router = Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const { page, limit, search } = getPaginationParams(req);

    const all = await db
      .select()
      .from(categories)
      .orderBy(asc(categories.displayOrder));

    let filtered = search
      ? all.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
      : all;

    return res.json(paginateResponse(filtered, page, limit));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.insert(categories).values(req.body).returning();
    return res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await db
      .update(categories)
      .set(req.body)
      .where(eq(categories.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.delete(categories).where(eq(categories.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
});

// GET subcategories by category ID
router.get("/:id/subcategories", async (req, res) => {
  try {
    const all = await db
      .select()
      .from(subcategories)
      .where(eq(subcategories.categoryId, Number(req.params.id)))
      .orderBy(asc(subcategories.displayOrder));
    return res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
});

router.post("/:id/subcategories", async (req, res) => {
  try {
    const data = { ...req.body, categoryId: Number(req.params.id) };
    const result = await db.insert(subcategories).values(data).returning();
    return res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create subcategory" });
  }
});

router.put("/subcategories/:id", async (req, res) => {
  try {
    const result = await db
      .update(subcategories)
      .set(req.body)
      .where(eq(subcategories.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update subcategory" });
  }
});

router.delete("/subcategories/:id", async (req, res) => {
  try {
    await db
      .delete(subcategories)
      .where(eq(subcategories.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subcategory" });
  }
});

export default router;
