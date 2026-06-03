import { Router } from "express";
import { db, products, categories, subcategories } from "@vega/db";
import { eq, desc, like, and } from "drizzle-orm";
import { slugify } from "@vega/utils";
import {
  getPaginationParams,
  paginateResponse,
  filterBySearch,
  filterByStatus,
  filterByCategory,
} from "../lib/pagination";

const router = Router();

// GET /api/products?page=1&limit=20&search=bed&status=published&category=Camp+Furniture
router.get("/", async (req, res) => {
  try {
    const { page, limit, search, sortBy, sortOrder, status, category } =
      getPaginationParams(req);
    const conditions = [];

    if (search) conditions.push(like(products.name, `%${search}%`));
    if (status) conditions.push(eq(products.status, status as any));
    if (category) conditions.push(eq(products.categoryId, Number(category)));

    const order =
      sortBy === "createdAt"
        ? sortOrder === "asc"
          ? products.createdAt
          : desc(products.createdAt)
        : desc(products.createdAt);

    const all = await db
      .select({
        product: products,
        categoryName: categories.name,
        subcategoryName: subcategories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(order);

    const mapped = all.map((row) => ({
      ...row.product,
      categoryName: row.categoryName,
      subcategoryName: row.subcategoryName,
    }));

    return res.json(paginateResponse(mapped, page, limit));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const result = await db
      .select({
        product: products,
        categoryName: categories.name,
        subcategoryName: subcategories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
      .where(eq(products.slug, req.params.slug))
      .limit(1);

    if (!result.length) {
      return res.status(404).json({ error: "Product not found" });
    }

    const mapped = {
      ...result[0].product,
      categoryName: result[0].categoryName,
      subcategoryName: result[0].subcategoryName,
    };

    return res.json(mapped);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

function cleanProductBody(body: any) {
  const { id, createdAt, updatedAt, ...rest } = body;
  return rest;
}

function ensureProductSlug(data: any): any {
  if (!data.slug || String(data.slug).trim() === "") {
    data.slug = slugify(data.name || "product");
  }
  return data;
}

router.post("/", async (req, res) => {
  try {
    const data = ensureProductSlug(cleanProductBody(req.body));
    const { name, slug, sku, categoryId } = data;
    if (!name || !slug || !sku || !categoryId) {
      return res.status(400).json({
        error: "Name, slug, SKU, and category are required."
      });
    }
    const result = await db.insert(products).values(data).returning();
    return res.status(201).json(result[0]);
  } catch (error: any) {
    console.error("Create product error:", error);
    res.status(500).json({ error: error.message || "Failed to create product" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = ensureProductSlug(cleanProductBody(req.body));
    const { name, slug, sku } = data;
    if (name === "" || slug === "" || sku === "") {
      return res.status(400).json({
        error: "Name, slug, and SKU cannot be empty."
      });
    }
    const result = await db
      .update(products)
      .set(data)
      .where(eq(products.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json(result[0]);
  } catch (error: any) {
    console.error("Update product error:", error);
    res.status(500).json({ error: error.message || "Failed to update product" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.delete(products).where(eq(products.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
