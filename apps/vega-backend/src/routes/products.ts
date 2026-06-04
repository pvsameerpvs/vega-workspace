import { Router } from "express";
import { db, products, categories, subcategories } from "@vega/db";
import { eq, desc, like, and, count, asc } from "drizzle-orm";
import { slugify } from "@vega/utils";
import { authenticate } from "../middleware/auth";
import { cleanBody } from "../lib/utils";
import {
  getPaginationParams,
  paginateResponse,
} from "../lib/pagination";

const router = Router();

// GET /api/products?page=1&limit=20&search=bed&status=published&category=1&subcategory=2
router.get("/", async (req, res) => {
  try {
    const { page, limit, search, sortBy, sortOrder, status, category, subcategory } =
      getPaginationParams(req);
    const conditions = [];

    if (search) conditions.push(like(products.name, `%${search}%`));
    if (status) conditions.push(eq(products.status, status as any));
    if (category) conditions.push(eq(products.categoryId, Number(category)));
    if (subcategory) conditions.push(eq(products.subcategoryId, Number(subcategory)));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const order =
      sortBy === "createdAt"
        ? sortOrder === "asc"
          ? products.createdAt
          : desc(products.createdAt)
        : desc(products.createdAt);

    const [countResult] = await db
      .select({ total: count() })
      .from(products)
      .where(whereClause);

    const all = await db
      .select({
        product: products,
        categoryName: categories.name,
        categoryNameAr: categories.nameAr,
        categorySlug: categories.slug,
        subcategoryName: subcategories.name,
        subcategoryNameAr: subcategories.nameAr,
        subcategorySlug: subcategories.slug,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
      .where(whereClause)
      .orderBy(order)
      .limit(limit)
      .offset((page - 1) * limit);

    const mapped = all.map((row) => ({
      ...row.product,
      categoryName: row.categoryName,
      categoryNameAr: row.categoryNameAr,
      categorySlug: row.categorySlug,
      subcategoryName: row.subcategoryName,
      subcategoryNameAr: row.subcategoryNameAr,
      subcategorySlug: row.subcategorySlug,
    }));

    return res.json(paginateResponse(mapped, page, limit, countResult.total));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET /api/products/resolve?path=office-furniture/executive-chairs/ergonomic-chair
// MUST be before /:slug to avoid "resolve" being treated as a product slug
router.get("/resolve", async (req, res) => {
  try {
    const path = req.query.path as string;
    if (!path) {
      return res.status(400).json({ error: "Path is required" });
    }
    const segments = path.split("/").filter(Boolean);

    if (segments.length === 0) {
      return res.status(404).json({ error: "Invalid path" });
    }

    // 1 segment: try category, then product
    if (segments.length === 1) {
      const [cat] = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, segments[0]))
        .limit(1);
      if (cat) {
        const subs = await db
          .select()
          .from(subcategories)
          .where(eq(subcategories.categoryId, cat.id))
          .orderBy(asc(subcategories.displayOrder));
        return res.json({ type: "category", data: { ...cat, subcategories: subs } });
      }
      const [prod] = await db
        .select({
          product: products,
          categoryName: categories.name,
          categoryNameAr: categories.nameAr,
          categorySlug: categories.slug,
          subcategoryName: subcategories.name,
          subcategoryNameAr: subcategories.nameAr,
          subcategorySlug: subcategories.slug,
        })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
        .where(eq(products.slug, segments[0]))
        .limit(1);
      if (prod) {
        return res.json({
          type: "product",
          data: {
            ...prod.product,
            categoryName: prod.categoryName,
            categoryNameAr: prod.categoryNameAr,
            categorySlug: prod.categorySlug,
            subcategoryName: prod.subcategoryName,
            subcategoryNameAr: prod.subcategoryNameAr,
            subcategorySlug: prod.subcategorySlug,
          },
        });
      }
      return res.status(404).json({ error: "Not found" });
    }

    // 2 segments: category + (subcategory OR product)
    if (segments.length === 2) {
      const [cat] = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, segments[0]))
        .limit(1);
      if (!cat) {
        return res.status(404).json({ error: "Category not found" });
      }

      const [sub] = await db
        .select()
        .from(subcategories)
        .where(
          and(
            eq(subcategories.slug, segments[1]),
            eq(subcategories.categoryId, cat.id)
          )
        )
        .limit(1);
      if (sub) {
        return res.json({
          type: "subcategory",
          data: { ...sub, categorySlug: cat.slug, categoryName: cat.name, categoryNameAr: cat.nameAr },
        });
      }

      const [prod] = await db
        .select({
          product: products,
          categoryName: categories.name,
          categoryNameAr: categories.nameAr,
          categorySlug: categories.slug,
          subcategoryName: subcategories.name,
          subcategoryNameAr: subcategories.nameAr,
          subcategorySlug: subcategories.slug,
        })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
        .where(
          and(
            eq(products.slug, segments[1]),
            eq(products.categoryId, cat.id)
          )
        )
        .limit(1);
      if (prod) {
        return res.json({
          type: "product",
          data: {
            ...prod.product,
            categoryName: prod.categoryName,
            categoryNameAr: prod.categoryNameAr,
            categorySlug: prod.categorySlug,
            subcategoryName: prod.subcategoryName,
            subcategoryNameAr: prod.subcategoryNameAr,
            subcategorySlug: prod.subcategorySlug,
          },
        });
      }
      return res.status(404).json({ error: "Not found" });
    }

    // 3 segments: category + subcategory + product
    if (segments.length === 3) {
      const [cat] = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, segments[0]))
        .limit(1);
      if (!cat) {
        return res.status(404).json({ error: "Category not found" });
      }

      const [sub] = await db
        .select()
        .from(subcategories)
        .where(
          and(
            eq(subcategories.slug, segments[1]),
            eq(subcategories.categoryId, cat.id)
          )
        )
        .limit(1);
      if (sub) {
        const [prod] = await db
          .select({
            product: products,
            categoryName: categories.name,
            categoryNameAr: categories.nameAr,
            categorySlug: categories.slug,
            subcategoryName: subcategories.name,
            subcategoryNameAr: subcategories.nameAr,
            subcategorySlug: subcategories.slug,
          })
          .from(products)
          .leftJoin(categories, eq(products.categoryId, categories.id))
          .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
          .where(
            and(
              eq(products.slug, segments[2]),
              eq(products.categoryId, cat.id),
              eq(products.subcategoryId, sub.id)
            )
          )
          .limit(1);
        if (prod) {
          return res.json({
            type: "product",
            data: {
              ...prod.product,
              categoryName: prod.categoryName,
              categoryNameAr: prod.categoryNameAr,
              categorySlug: prod.categorySlug,
              subcategoryName: prod.subcategoryName,
              subcategoryNameAr: prod.subcategoryNameAr,
              subcategorySlug: prod.subcategorySlug,
            },
          });
        }
      }
      return res.status(404).json({ error: "Not found" });
    }

    return res.status(404).json({ error: "Invalid path" });
  } catch (error) {
    console.error("Resolve path error:", error);
    res.status(500).json({ error: "Failed to resolve path" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const result = await db
      .select({
        product: products,
        categoryName: categories.name,
        categoryNameAr: categories.nameAr,
        categorySlug: categories.slug,
        subcategoryName: subcategories.name,
        subcategoryNameAr: subcategories.nameAr,
        subcategorySlug: subcategories.slug,
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
      categoryNameAr: result[0].categoryNameAr,
      categorySlug: result[0].categorySlug,
      subcategoryName: result[0].subcategoryName,
      subcategoryNameAr: result[0].subcategoryNameAr,
      subcategorySlug: result[0].subcategorySlug,
    };

    return res.json(mapped);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

function ensureProductSlug(data: any): any {
  if (!data.slug || String(data.slug).trim() === "") {
    data.slug = slugify(data.name || "product");
  }
  return data;
}

router.post("/", authenticate, async (req, res) => {
  try {
    const data = ensureProductSlug(cleanBody(req.body));
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

router.put("/:id", authenticate, async (req, res) => {
  try {
    const data = ensureProductSlug(cleanBody(req.body));
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

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await db.delete(products).where(eq(products.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
