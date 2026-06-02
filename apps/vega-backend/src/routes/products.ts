import { Router } from "express";
import { db, products, MOCK_PRODUCTS } from "@vega/db";
import { eq, desc, like, and } from "drizzle-orm";
import { getPaginationParams, paginateResponse, filterBySearch, filterByStatus, filterByCategory } from "../lib/pagination";

const router = Router();

// GET /api/products?page=1&limit=20&search=bed&status=published&category=Camp+Furniture
router.get("/", async (req, res) => {
  try {
    const { page, limit, search, sortBy, sortOrder, status, category } = getPaginationParams(req);

    if (db) {
      const conditions = [];
      if (search) conditions.push(like(products.name, `%${search}%`));
      if (status) conditions.push(eq(products.status, status as any));
      if (category) conditions.push(eq(products.categoryId, Number(category)));

      const order = sortBy === "createdAt" ? (sortOrder === "asc" ? products.createdAt : desc(products.createdAt)) : desc(products.createdAt);

      if (conditions.length === 0) {
        const all = await db.select().from(products).orderBy(order);
        return res.json(paginateResponse(all, page, limit));
      }
      const all = await db.select().from(products).where(and(...conditions)).orderBy(order);
      return res.json(paginateResponse(all, page, limit));
    }

    let filtered = [...MOCK_PRODUCTS];
    if (search) filtered = filterBySearch(filtered, search, ["name", "nameAr", "sku", "description"]);
    if (status) filtered = filterByStatus(filtered, status);
    if (category) filtered = filterByCategory(filtered, category, "category");

    res.json(paginateResponse(filtered, page, limit));
  } catch (error) {
    res.json(paginateResponse(MOCK_PRODUCTS, 1, 20));
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
