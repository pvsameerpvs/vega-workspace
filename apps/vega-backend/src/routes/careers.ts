import { Router } from "express";
import { db, careers, jobApplications } from "@vega/db";
import { eq, desc, like } from "drizzle-orm";
import {
  getPaginationParams,
  paginateResponse,
  filterBySearch,
} from "../lib/pagination";

const router = Router();

// GET /api/careers/jobs?page=1&limit=20&search=sales
router.get("/jobs", async (req, res) => {
  try {
    const { page, limit, search } = getPaginationParams(req);

    if (search) {
      const all = await db
        .select()
        .from(careers)
        .where(like(careers.title, `%${search}%`))
        .orderBy(desc(careers.createdAt));
      return res.json(paginateResponse(all, page, limit));
    }

    const all = await db
      .select()
      .from(careers)
      .orderBy(desc(careers.createdAt));
    return res.json(paginateResponse(all, page, limit));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

router.get("/applications", async (req, res) => {
  try {
    const { page, limit, search } = getPaginationParams(req);

    if (search) {
      const all = await db
        .select()
        .from(jobApplications)
        .where(like(jobApplications.fullName, `%${search}%`))
        .orderBy(desc(jobApplications.createdAt));
      return res.json(paginateResponse(all, page, limit));
    }

    const all = await db
      .select()
      .from(jobApplications)
      .orderBy(desc(jobApplications.createdAt));
    return res.json(paginateResponse(all, page, limit));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

router.post("/jobs", async (req, res) => {
  try {
    const result = await db.insert(careers).values(req.body).returning();
    return res.status(201).json(result[0]);
  } catch (error: any) {
    console.error("Create job error:", error);
    res.status(500).json({ error: error.message || "Failed to create job" });
  }
});

router.put("/jobs/:id", async (req, res) => {
  try {
    const result = await db
      .update(careers)
      .set(req.body)
      .where(eq(careers.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Job not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update job" });
  }
});

router.delete("/jobs/:id", async (req, res) => {
  try {
    await db.delete(careers).where(eq(careers.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

router.post("/applications", async (req, res) => {
  try {
    const result = await db
      .insert(jobApplications)
      .values(req.body)
      .returning();
    return res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit application" });
  }
});

export default router;
