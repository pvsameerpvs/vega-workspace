import { Router } from "express";
import { db, leads, MOCK_LEADS } from "@vega/db";
import { eq, desc, like, and, or } from "drizzle-orm";
import { getPaginationParams, paginateResponse, filterBySearch, filterByStatus } from "../lib/pagination";

const router = Router();

// GET /api/leads?page=1&limit=20&search=ahmed&status=new
router.get("/", async (req, res) => {
  try {
    const { page, limit, search, status } = getPaginationParams(req);

    if (db) {
      const conditions = [];
      if (search) {
        conditions.push(
          or(
            like(leads.name, `%${search}%`),
            like(leads.email, `%${search}%`),
            like(leads.companyName, `%${search}%`)
          )
        );
      }
      if (status) conditions.push(eq(leads.status, status as any));

      if (conditions.length === 0) {
        const all = await db.select().from(leads).orderBy(desc(leads.createdAt));
        return res.json(paginateResponse(all, page, limit));
      }
      const all = await db.select().from(leads).where(and(...conditions)).orderBy(desc(leads.createdAt));
      return res.json(paginateResponse(all, page, limit));
    }

    let filtered = [...MOCK_LEADS];
    if (search) filtered = filterBySearch(filtered, search, ["name", "email", "companyName", "productName"]);
    if (status) filtered = filterByStatus(filtered, status);
    res.json(paginateResponse(filtered, page, limit));
  } catch (error) {
    res.json(paginateResponse(MOCK_LEADS, 1, 20));
  }
});

router.post("/", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(leads).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_LEADS.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create lead" });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (db) {
      const result = await db.update(leads).set({ status }).where(eq(leads.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_LEADS.find((l) => l.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "Lead not found" });
    res.json({ ...found, status });
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead status" });
  }
});

export default router;
