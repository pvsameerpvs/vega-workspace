import { Router } from "express";
import { db, careers, jobApplications } from "@vega/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/jobs", async (_req, res) => {
  try {
    const all = await db.select().from(careers).orderBy(desc(careers.createdAt));
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

router.get("/applications", async (_req, res) => {
  try {
    const all = await db.select().from(jobApplications).orderBy(desc(jobApplications.createdAt));
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

router.post("/applications", async (req, res) => {
  try {
    const result = await db.insert(jobApplications).values(req.body).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit application" });
  }
});

export default router;
