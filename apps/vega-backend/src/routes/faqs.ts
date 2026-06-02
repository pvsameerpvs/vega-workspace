import { Router } from "express";
import { db, faqs, MOCK_FAQS } from "@vega/db";
import { eq, asc, like } from "drizzle-orm";
import { getPaginationParams, paginateResponse, filterBySearch } from "../lib/pagination";

const router = Router();

// GET /api/faqs?page=1&limit=20&search=delivery
router.get("/", async (req, res) => {
  try {
    const { page, limit, search } = getPaginationParams(req);

    if (db) {
      if (search) {
        const all = await db.select().from(faqs).where(like(faqs.question, `%${search}%`)).orderBy(asc(faqs.displayOrder));
        return res.json(paginateResponse(all, page, limit));
      }
      const all = await db.select().from(faqs).orderBy(asc(faqs.displayOrder));
      return res.json(paginateResponse(all, page, limit));
    }

    let filtered = [...MOCK_FAQS];
    if (search) filtered = filterBySearch(filtered, search, ["question", "questionAr", "answer", "category"]);
    res.json(paginateResponse(filtered, page, limit));
  } catch (error) {
    res.json(paginateResponse(MOCK_FAQS, 1, 20));
  }
});

router.post("/", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(faqs).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_FAQS.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create FAQ" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(faqs).set(req.body).where(eq(faqs.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_FAQS.find((f) => f.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "FAQ not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update FAQ" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (db) {
      await db.delete(faqs).where(eq(faqs.id, Number(req.params.id)));
      return res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete FAQ" });
  }
});

export default router;
