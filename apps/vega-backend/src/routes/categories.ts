import { Router } from "express";
import { db, categories, subcategories, MOCK_CATEGORIES, MOCK_SUBCATEGORIES } from "@vega/db";
import { eq, asc } from "drizzle-orm";
import { getPaginationParams, paginateResponse, filterBySearch } from "../lib/pagination";

const router = Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const { page, limit, search } = getPaginationParams(req);

    if (db) {
      let query = db.select().from(categories).orderBy(asc(categories.displayOrder));
      const all = await query;
      let filtered = search ? all.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())) : all;
      return res.json(paginateResponse(filtered, page, limit));
    }

    let filtered = [...MOCK_CATEGORIES];
    if (search) filtered = filterBySearch(filtered, search, ["name", "nameAr"]);
    res.json(paginateResponse(filtered, page, limit));
  } catch (error) {
    res.json(paginateResponse(MOCK_CATEGORIES, 1, 20));
  }
});

router.post("/", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(categories).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_CATEGORIES.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(categories).set(req.body).where(eq(categories.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_CATEGORIES.find((c) => c.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "Category not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (db) {
      await db.delete(categories).where(eq(categories.id, Number(req.params.id)));
      return res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
});

// GET subcategories by category ID
router.get("/:id/subcategories", async (req, res) => {
  try {
    if (db) {
      const all = await db.select().from(subcategories).where(eq(subcategories.categoryId, Number(req.params.id))).orderBy(asc(subcategories.displayOrder));
      return res.json(all);
    }
    const filtered = MOCK_SUBCATEGORIES.filter((s) => s.categoryId === Number(req.params.id));
    res.json(filtered);
  } catch (error) {
    res.json(MOCK_SUBCATEGORIES.filter((s) => s.categoryId === Number(req.params.id)));
  }
});

router.post("/:id/subcategories", async (req, res) => {
  try {
    const data = { ...req.body, categoryId: Number(req.params.id) };
    if (db) {
      const result = await db.insert(subcategories).values(data).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...data, id: MOCK_SUBCATEGORIES.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create subcategory" });
  }
});

router.put("/subcategories/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(subcategories).set(req.body).where(eq(subcategories.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_SUBCATEGORIES.find((s) => s.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "Subcategory not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update subcategory" });
  }
});

router.delete("/subcategories/:id", async (req, res) => {
  try {
    if (db) {
      await db.delete(subcategories).where(eq(subcategories.id, Number(req.params.id)));
      return res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subcategory" });
  }
});

export default router;
