import { Router } from "express";
import { db, products, MOCK_PRODUCTS } from "@vega/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    if (db) {
      const all = await db.select().from(products).orderBy(desc(products.createdAt));
      return res.json(all);
    }
    res.json(MOCK_PRODUCTS);
  } catch (error) {
    res.json(MOCK_PRODUCTS);
  }
});

router.get("/:slug", async (req, res) => {
  try {
    if (db) {
      const result = await db.select().from(products).where(eq(products.slug, req.params.slug)).limit(1);
      if (!result.length) return res.status(404).json({ error: "Product not found" });
      return res.json(result[0]);
    }
    const found = MOCK_PRODUCTS.find((p) => p.slug === req.params.slug);
    if (!found) return res.status(404).json({ error: "Product not found" });
    res.json(found);
  } catch (error) {
    const found = MOCK_PRODUCTS.find((p) => p.slug === req.params.slug);
    if (!found) return res.status(404).json({ error: "Product not found" });
    res.json(found);
  }
});

router.post("/", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(products).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_PRODUCTS.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(products).set(req.body).where(eq(products.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_PRODUCTS.find((p) => p.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "Product not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (db) {
      await db.delete(products).where(eq(products.id, Number(req.params.id)));
      return res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
