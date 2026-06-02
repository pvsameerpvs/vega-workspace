import { Router } from "express";
import { db, teamMembers } from "@vega/db";
import { eq, asc, like } from "drizzle-orm";
import {
  getPaginationParams,
  paginateResponse,
  filterBySearch,
} from "../lib/pagination";

const router = Router();

// GET /api/team?page=1&limit=20&search=faisal
router.get("/", async (req, res) => {
  try {
    const { page, limit, search } = getPaginationParams(req);

    if (search) {
      const all = await db
        .select()
        .from(teamMembers)
        .where(like(teamMembers.name, `%${search}%`))
        .orderBy(asc(teamMembers.displayOrder));
      return res.json(paginateResponse(all, page, limit));
    }

    const all = await db
      .select()
      .from(teamMembers)
      .orderBy(asc(teamMembers.displayOrder));
    return res.json(paginateResponse(all, page, limit));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.insert(teamMembers).values(req.body).returning();
    return res.status(201).json(result[0]);
  } catch (error: any) {
    console.error("Create team member error:", error);
    res.status(500).json({ error: error.message || "Failed to create team member" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await db
      .update(teamMembers)
      .set(req.body)
      .where(eq(teamMembers.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Team member not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update team member" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db
      .delete(teamMembers)
      .where(eq(teamMembers.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete team member" });
  }
});

export default router;
