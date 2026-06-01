import { Router } from "express";
import { db, categories, subcategories, MOCK_CATEGORIES, MOCK_SUBCATEGORIES } from "@vega/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    if (db) {
      const all = await db.select().from(categories).orderBy(asc(categories.displayOrder));
      return res.json(all);
    }
    res.json(MOCK_CATEGORIES);
  } catch (error) {
    res.json(MOCK_CATEGORIES);
  }
});

router.get("/:id/subcategories", async (req, res) => {
  try {
    if (db) {
      const all = await db.select().from(subcategories).where(eq(subcategories.categoryId, Number(req.params.id)));
      return res.json(all);
    }
    const filtered = MOCK_SUBCATEGORIES.filter((s) => s.categoryId === Number(req.params.id));
    res.json(filtered);
  } catch (error) {
    res.json(MOCK_SUBCATEGORIES.filter((s) => s.categoryId === Number(req.params.id)));
  }
});

export default router;
