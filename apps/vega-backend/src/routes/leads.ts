import { Router } from "express";
import { db, leads } from "@vega/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const all = await db.select().from(leads).orderBy(desc(leads.createdAt));
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.insert(leads).values(req.body).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create lead" });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const result = await db.update(leads).set({ status }).where(eq(leads.id, Number(req.params.id))).returning();
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead status" });
  }
});

export default router;
