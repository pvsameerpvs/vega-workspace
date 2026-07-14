import { Router } from "express";
import { db, catalogs, catalogCategories, categories, products } from "@vega/db";
import { eq, desc, asc, like, and, inArray } from "drizzle-orm";
import { authenticate } from "../middleware/auth";
import { cleanBody } from "../lib/utils";
import {
  getPaginationParams,
  paginateResponse,
} from "../lib/pagination";

const router = Router();

// GET /api/catalogs?page=1&limit=20&search=office
router.get("/", async (req, res) => {
  try {
    const { page, limit, search } = getPaginationParams(req);
    const conditions = [];

    if (search) conditions.push(like(catalogs.title, `%${search}%`));

    const query = conditions.length === 0
      ? db.select().from(catalogs).orderBy(desc(catalogs.createdAt))
      : db.select().from(catalogs).where(and(...conditions)).orderBy(desc(catalogs.createdAt));

    const all = await query;

    // Attach categories to each catalog
    const catalogIds = all.map((c) => c.id);
    if (catalogIds.length > 0) {
      const links = await db
        .select({
          catalogId: catalogCategories.catalogId,
          categoryId: categories.id,
          categoryName: categories.name,
          categoryNameAr: categories.nameAr,
          categorySlug: categories.slug,
        })
        .from(catalogCategories)
        .innerJoin(categories, eq(catalogCategories.categoryId, categories.id))
        .where(inArray(catalogCategories.catalogId, catalogIds));

      for (const catalog of all) {
        (catalog as any).categories = links
          .filter((l) => l.catalogId === catalog.id)
          .map((l) => ({
            id: l.categoryId,
            name: l.categoryName,
            nameAr: l.categoryNameAr,
            slug: l.categorySlug,
          }));
      }
    } else {
      for (const catalog of all) {
        (catalog as any).categories = [];
      }
    }

    res.set("Cache-Control", "public, max-age=300, s-maxage=600");
    return res.json(paginateResponse(all, page, limit));
  } catch (error) {
    console.error("Fetch catalogs error:", error);
    res.status(500).json({ error: "Failed to fetch catalogs" });
  }
});

// GET /api/catalogs/by-category/:categoryId — all catalogs for a given category
router.get("/by-category/:categoryId", async (req, res) => {
  try {
    const result = await db
      .select({
        id: catalogs.id,
        title: catalogs.title,
        titleAr: catalogs.titleAr,
        coverImage: catalogs.coverImage,
        pdfFile: catalogs.pdfFile,
      })
      .from(catalogCategories)
      .innerJoin(catalogs, eq(catalogCategories.catalogId, catalogs.id))
      .where(eq(catalogCategories.categoryId, Number(req.params.categoryId)))
      .orderBy(desc(catalogs.createdAt));

    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch catalogs by category" });
  }
});

// GET /api/catalogs/:id — single catalog with categories + products
router.get("/:id", async (req, res) => {
  try {
    const [catalog] = await db
      .select()
      .from(catalogs)
      .where(eq(catalogs.id, Number(req.params.id)))
      .limit(1);

    if (!catalog) {
      return res.status(404).json({ error: "Catalog not found" });
    }

    // Get linked categories
    const links = await db
      .select({
        categoryId: categories.id,
        name: categories.name,
        nameAr: categories.nameAr,
        slug: categories.slug,
        description: categories.description,
        descriptionAr: categories.descriptionAr,
        image: categories.image,
      })
      .from(catalogCategories)
      .innerJoin(categories, eq(catalogCategories.categoryId, categories.id))
      .where(eq(catalogCategories.catalogId, catalog.id))
      .orderBy(asc(categories.displayOrder));

    // Get products per category
    const categoryIds = links.map((l) => l.categoryId);
    let allProducts: any[] = [];
    if (categoryIds.length > 0) {
      allProducts = await db
        .select()
        .from(products)
        .where(inArray(products.categoryId, categoryIds))
        .orderBy(desc(products.createdAt));
    }

    const categoriesWithProducts = links.map((link) => ({
      ...link,
      products: allProducts
        .filter((p) => p.categoryId === link.categoryId)
        .map((p) => ({
          id: p.id,
          name: p.name,
          nameAr: p.nameAr,
          slug: p.slug,
          sku: p.sku,
          mainImage: p.mainImage,
          status: p.status,
        })),
    }));

    return res.json({ ...catalog, categories: categoriesWithProducts });
  } catch (error) {
    console.error("Fetch catalog error:", error);
    res.status(500).json({ error: "Failed to fetch catalog" });
  }
});

// GET /api/catalogs/:id/categories — categories for a catalog
router.get("/:id/categories", async (req, res) => {
  try {
    const links = await db
      .select({
        id: categories.id,
        name: categories.name,
        nameAr: categories.nameAr,
        slug: categories.slug,
      })
      .from(catalogCategories)
      .innerJoin(categories, eq(catalogCategories.categoryId, categories.id))
      .where(eq(catalogCategories.catalogId, Number(req.params.id)))
      .orderBy(asc(categories.displayOrder));

    return res.json(links);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch catalog categories" });
  }
});

// POST /api/catalogs/:id/categories — link a category to catalog
router.post("/:id/categories", authenticate, async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json({ error: "categoryId is required" });
    }

    // Check if already linked
    const [existing] = await db
      .select()
      .from(catalogCategories)
      .where(
        and(
          eq(catalogCategories.catalogId, Number(req.params.id)),
          eq(catalogCategories.categoryId, Number(categoryId))
        )
      )
      .limit(1);

    if (existing) {
      return res.status(409).json({ error: "Category already linked to this catalog" });
    }

    const result = await db
      .insert(catalogCategories)
      .values({ catalogId: Number(req.params.id), categoryId: Number(categoryId) })
      .returning();

    return res.status(201).json(result[0]);
  } catch (error: any) {
    console.error("Link category error:", error);
    res.status(500).json({ error: error.message || "Failed to link category" });
  }
});

// DELETE /api/catalogs/:id/categories/:categoryId — unlink category from catalog
router.delete("/:id/categories/:categoryId", authenticate, async (req, res) => {
  try {
    await db
      .delete(catalogCategories)
      .where(
        and(
          eq(catalogCategories.catalogId, Number(req.params.id)),
          eq(catalogCategories.categoryId, Number(req.params.categoryId))
        )
      );

    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to unlink category" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const result = await db.insert(catalogs).values(cleanBody(req.body)).returning();
    return res.status(201).json(result[0]);
  } catch (error: any) {
    console.error("Create catalog error:", error);
    res.status(500).json({ error: error.message || "Failed to create catalog" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const result = await db
      .update(catalogs)
      .set(cleanBody(req.body))
      .where(eq(catalogs.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Catalog not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update catalog" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await db.delete(catalogs).where(eq(catalogs.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete catalog" });
  }
});

export default router;
