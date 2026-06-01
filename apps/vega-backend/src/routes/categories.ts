import { Router } from "express";
import { db, categories, subcategories } from "@vega/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const all = await db.select().from(categories).orderBy(asc(categories.displayOrder));
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.get("/:id/subcategories", async (req, res) => {
  try {
    const all = await db.select().from(subcategories).where(eq(subcategories.categoryId, Number(req.params.id)));
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
});

export default router;
