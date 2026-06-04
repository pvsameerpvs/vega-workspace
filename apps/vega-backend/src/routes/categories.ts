import { Router } from "express";
import { db, categories, subcategories, products } from "@vega/db";
import { eq, asc, desc } from "drizzle-orm";
import { slugify } from "@vega/utils";
import { authenticate } from "../middleware/auth";
import { cleanBody } from "../lib/utils";
import {
  getPaginationParams,
  paginateResponse,
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

    const allSubcategories = await db.select().from(subcategories);

    const withSubs = filtered.map((cat) => ({
      ...cat,
      subcategories: allSubcategories
        .filter((s) => s.categoryId === cat.id)
        .map((s) => s.name),
    }));

    return res.json(paginateResponse(withSubs, page, limit));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// GET categories with top 4 products each
router.get("/with-products", async (req, res) => {
  try {
    const allCategories = await db
      .select()
      .from(categories)
      .where(eq(categories.isActive, true))
      .orderBy(asc(categories.displayOrder));

    const allProducts = await db
      .select({
        id: products.id,
        name: products.name,
        nameAr: products.nameAr,
        slug: products.slug,
        sku: products.sku,
        mainImage: products.mainImage,
        categoryId: products.categoryId,
      })
      .from(products)
      .where(eq(products.status, "published"))
      .orderBy(desc(products.createdAt));

    const result = allCategories.map((cat) => ({
      ...cat,
      products: allProducts
        .filter((p) => p.categoryId === cat.id)
        .slice(0, 4),
    }));

    return res.json(result);
  } catch (error) {
    console.error("Fetch categories with products error:", error);
    res.status(500).json({ error: "Failed to fetch categories with products" });
  }
});

function ensureCategorySlug(body: any): any {
  if (!body.slug || String(body.slug).trim() === "") {
    body.slug = slugify(body.name || "category");
  }
  return body;
}

router.post("/", authenticate, async (req, res) => {
  try {
    const body = ensureCategorySlug(cleanBody(req.body));
    const { name, nameAr, slug, description, descriptionAr, image, banner, seoTitle, seoDescription, displayOrder, isActive } = body;
    if (!name || !slug) {
      return res.status(400).json({ error: "Name and slug are required" });
    }
    const result = await db.insert(categories).values({ name, nameAr, slug, description, descriptionAr, image, banner, seoTitle, seoDescription, displayOrder, isActive }).returning();
    return res.status(201).json(result[0]);
  } catch (error: any) {
    console.error("Create category error:", error);
    res.status(500).json({ error: error.message || "Failed to create category" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const body = ensureCategorySlug(cleanBody(req.body));
    const { name, nameAr, slug, description, descriptionAr, image, banner, seoTitle, seoDescription, displayOrder, isActive } = body;
    const result = await db
      .update(categories)
      .set({ name, nameAr, slug, description, descriptionAr, image, banner, seoTitle, seoDescription, displayOrder, isActive })
      .where(eq(categories.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.json(result[0]);
  } catch (error: any) {
    console.error("Update category error:", error);
    res.status(500).json({ error: error.message || "Failed to update category" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await db.delete(categories).where(eq(categories.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error: any) {
    console.error("Delete category error:", error);
    res.status(500).json({ error: error.message || "Failed to delete category" });
  }
});

// GET category by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const [cat] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, req.params.slug))
      .limit(1);
    if (!cat) {
      return res.status(404).json({ error: "Category not found" });
    }
    const subs = await db
      .select()
      .from(subcategories)
      .where(eq(subcategories.categoryId, cat.id))
      .orderBy(asc(subcategories.displayOrder));
    return res.json({ ...cat, subcategories: subs });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

// GET subcategory by slug
router.get("/subcategories/slug/:slug", async (req, res) => {
  try {
    const [sub] = await db
      .select()
      .from(subcategories)
      .where(eq(subcategories.slug, req.params.slug))
      .limit(1);
    if (!sub) {
      return res.status(404).json({ error: "Subcategory not found" });
    }
    const [cat] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, sub.categoryId))
      .limit(1);
    return res.json({ ...sub, categorySlug: cat?.slug, categoryName: cat?.name });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategory" });
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

router.post("/:id/subcategories", authenticate, async (req, res) => {
  try {
    const body = ensureCategorySlug(cleanBody(req.body));
    const { name, nameAr, slug, description, descriptionAr, image, seoTitle, seoDescription, displayOrder, isActive } = body;
    if (!name || !slug) {
      return res.status(400).json({ error: "Name and slug are required" });
    }
    const data = { name, nameAr, slug, description, descriptionAr, image, seoTitle, seoDescription, displayOrder, isActive, categoryId: Number(req.params.id) };
    const result = await db.insert(subcategories).values(data).returning();
    return res.status(201).json(result[0]);
  } catch (error: any) {
    console.error("Create subcategory error:", error);
    res.status(500).json({ error: error.message || "Failed to create subcategory" });
  }
});

router.put("/subcategories/:id", authenticate, async (req, res) => {
  try {
    const body = ensureCategorySlug(cleanBody(req.body));
    const { name, nameAr, slug, description, descriptionAr, image, seoTitle, seoDescription, displayOrder, isActive } = body;
    const result = await db
      .update(subcategories)
      .set({ name, nameAr, slug, description, descriptionAr, image, seoTitle, seoDescription, displayOrder, isActive })
      .where(eq(subcategories.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    return res.json(result[0]);
  } catch (error: any) {
    console.error("Update subcategory error:", error);
    res.status(500).json({ error: error.message || "Failed to update subcategory" });
  }
});

router.delete("/subcategories/:id", authenticate, async (req, res) => {
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
