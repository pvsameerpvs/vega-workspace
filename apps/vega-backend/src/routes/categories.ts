import { Router } from "express";
import { db, categories, subcategories } from "@vega/db";
import { eq, asc } from "drizzle-orm";
import { slugify } from "@vega/utils";
import { authenticate } from "../middleware/auth";
import { cleanBody } from "../lib/utils";
import {
  getPaginationParams,
  paginateResponse,
  filterBySearch,
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
