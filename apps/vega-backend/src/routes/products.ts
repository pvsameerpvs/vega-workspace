import { Router } from "express";
import { db, products } from "@vega/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const all = await db.select().from(products).orderBy(desc(products.createdAt));
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const result = await db.select().from(products).where(eq(products.slug, req.params.slug)).limit(1);
    if (!result.length) return res.status(404).json({ error: "Product not found" });
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.insert(products).values(req.body).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await db.update(products).set(req.body).where(eq(products.id, Number(req.params.id))).returning();
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.delete(products).where(eq(products.id, Number(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
