import { Router } from "express";
import { db, leads } from "@vega/db";
import { eq, desc, like, and, or, count } from "drizzle-orm";
import { authenticate } from "../middleware/auth";
import { cleanBody } from "../lib/utils";
import { sendLeadNotification } from "../lib/email";
import {
  getPaginationParams,
  paginateResponse,
  filterBySearch,
  filterByStatus,
} from "../lib/pagination";

const router = Router();

// GET /api/leads?page=1&limit=20&search=ahmed&status=new
router.get("/", authenticate, async (req, res) => {
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

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [countResult] = await db
      .select({ total: count() })
      .from(leads)
      .where(whereClause);

    const all = await db
      .select()
      .from(leads)
      .where(whereClause)
      .orderBy(desc(leads.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    return res.json(paginateResponse(all, page, limit, countResult.total));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.insert(leads).values(cleanBody(req.body)).returning();
    const lead = result[0];
    sendLeadNotification(lead as any);
    return res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ error: "Failed to create lead" });
  }
});

router.put("/:id/status", authenticate, async (req, res) => {
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

router.put("/:id", authenticate, async (req, res) => {
  try {
    const result = await db
      .update(leads)
      .set(cleanBody(req.body))
      .where(eq(leads.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Lead not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await db.delete(leads).where(eq(leads.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete lead" });
  }
});

export default router;
