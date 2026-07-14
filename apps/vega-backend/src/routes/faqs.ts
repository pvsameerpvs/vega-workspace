import { Router } from "express";
import { db, faqs } from "@vega/db";
import { eq, asc, like } from "drizzle-orm";
import { authenticate } from "../middleware/auth";
import { cleanBody } from "../lib/utils";
import {
  getPaginationParams,
  paginateResponse,
  filterBySearch,
} from "../lib/pagination";

const router = Router();

// GET /api/faqs?page=1&limit=20&search=delivery
router.get("/", async (req, res) => {
  try {
    const { page, limit, search } = getPaginationParams(req);

    if (search) {
      const all = await db
        .select()
        .from(faqs)
        .where(like(faqs.question, `%${search}%`))
        .orderBy(asc(faqs.displayOrder));
      res.set("Cache-Control", "public, max-age=60, s-maxage=120");
      return res.json(paginateResponse(all, page, limit));
    }

    const all = await db
      .select()
      .from(faqs)
      .orderBy(asc(faqs.displayOrder));
    res.set("Cache-Control", "public, max-age=300, s-maxage=600");
    return res.json(paginateResponse(all, page, limit));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const result = await db.insert(faqs).values(cleanBody(req.body)).returning();
    return res.status(201).json(result[0]);
  } catch (error: any) {
    console.error("Create FAQ error:", error);
    res.status(500).json({ error: error.message || "Failed to create FAQ" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const result = await db
      .update(faqs)
      .set(cleanBody(req.body))
      .where(eq(faqs.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "FAQ not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update FAQ" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await db.delete(faqs).where(eq(faqs.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete FAQ" });
  }
});

export default router;
