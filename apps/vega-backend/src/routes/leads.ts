import { Router } from "express";
import { db, leads, MOCK_LEADS } from "@vega/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    if (db) {
      const all = await db.select().from(leads).orderBy(desc(leads.createdAt));
      return res.json(all);
    }
    res.json(MOCK_LEADS);
  } catch (error) {
    res.json(MOCK_LEADS);
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
