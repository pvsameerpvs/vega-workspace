import { Router } from "express";
import { db, products, categories } from "@vega/db";
import { ilike, or, eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const q = String(req.query.q || "").trim();
    const limit = Math.min(Number(req.query.limit) || 8, 20);
    if (!q) return res.json({ products: [], categories: [] });

    const productConditions = or(
      ilike(products.name, `%${q}%`),
      ilike(products.nameAr, `%${q}%`),
      ilike(products.sku, `%${q}%`),
      ilike(products.slug, `%${q}%`)
    );

    const productRows = await db
      .select({
        id: products.id,
        name: products.name,
        nameAr: products.nameAr,
        slug: products.slug,
        sku: products.sku,
        mainImage: products.mainImage,
        categoryName: categories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(productConditions)
      .limit(limit);

    const categoryConditions = or(
      ilike(categories.name, `%${q}%`),
      ilike(categories.nameAr, `%${q}%`),
      ilike(categories.slug, `%${q}%`)
    );

    const categoryRows = await db
      .select({
        id: categories.id,
        name: categories.name,
        nameAr: categories.nameAr,
        slug: categories.slug,
        image: categories.image,
      })
      .from(categories)
      .where(categoryConditions)
      .limit(4);

    return res.json({ products: productRows, categories: categoryRows });
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;
