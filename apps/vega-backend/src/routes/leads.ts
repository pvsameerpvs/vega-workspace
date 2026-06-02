import { Router } from "express";
import { db, leads } from "@vega/db";
import { eq, desc, like, and, or } from "drizzle-orm";
import {
  getPaginationParams,
  paginateResponse,
  filterBySearch,
  filterByStatus,
} from "../lib/pagination";

const router = Router();

// GET /api/leads?page=1&limit=20&search=ahmed&status=new
router.get("/", async (req, res) => {
  try {
    const { page, limit, search, status } = getPaginationParams(req);
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
      const all = await db
        .select()
        .from(leads)
        .orderBy(desc(leads.createdAt));
      return res.json(paginateResponse(all, page, limit));
    }

    const all = await db
      .select()
      .from(leads)
      .where(and(...conditions))
      .orderBy(desc(leads.createdAt));
    return res.json(paginateResponse(all, page, limit));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.insert(leads).values(req.body).returning();
    return res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create lead" });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const result = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Lead not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead status" });
  }
});

export default router;
