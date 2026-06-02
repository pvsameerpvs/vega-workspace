import { Router } from "express";
import { db, careers, jobApplications, MOCK_CAREERS, MOCK_APPLICATIONS } from "@vega/db";
import { eq, desc, like } from "drizzle-orm";
import { getPaginationParams, paginateResponse, filterBySearch } from "../lib/pagination";

const router = Router();

// GET /api/careers/jobs?page=1&limit=20&search=sales
router.get("/jobs", async (req, res) => {
  try {
    const { page, limit, search } = getPaginationParams(req);

    if (db) {
      if (search) {
        const all = await db.select().from(careers).where(like(careers.title, `%${search}%`)).orderBy(desc(careers.createdAt));
        return res.json(paginateResponse(all, page, limit));
      }
      const all = await db.select().from(careers).orderBy(desc(careers.createdAt));
      return res.json(paginateResponse(all, page, limit));
    }

    let filtered = [...MOCK_CAREERS];
    if (search) filtered = filterBySearch(filtered, search, ["title", "titleAr", "department", "location"]);
    res.json(paginateResponse(filtered, page, limit));
  } catch (error) {
    res.json(paginateResponse(MOCK_CAREERS, 1, 20));
  }
});

router.get("/applications", async (req, res) => {
  try {
    const { page, limit, search } = getPaginationParams(req);

    if (db) {
      if (search) {
        const all = await db.select().from(jobApplications).where(like(jobApplications.fullName, `%${search}%`)).orderBy(desc(jobApplications.createdAt));
        return res.json(paginateResponse(all, page, limit));
      }
      const all = await db.select().from(jobApplications).orderBy(desc(jobApplications.createdAt));
      return res.json(paginateResponse(all, page, limit));
    }

    let filtered = [...MOCK_APPLICATIONS];
    if (search) filtered = filterBySearch(filtered, search, ["fullName", "email", "position"]);
    res.json(paginateResponse(filtered, page, limit));
  } catch (error) {
    res.json(paginateResponse(MOCK_APPLICATIONS, 1, 20));
  }
});

router.post("/jobs", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(careers).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_CAREERS.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create job" });
  }
});

router.put("/jobs/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(careers).set(req.body).where(eq(careers.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_CAREERS.find((c) => c.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "Job not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update job" });
  }
});

router.delete("/jobs/:id", async (req, res) => {
  try {
    if (db) {
      await db.delete(careers).where(eq(careers.id, Number(req.params.id)));
      return res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

router.post("/applications", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(jobApplications).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_APPLICATIONS.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit application" });
  }
});

export default router;
