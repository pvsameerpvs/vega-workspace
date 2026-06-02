import { Router } from "express";
import { db, teamMembers, MOCK_TEAM } from "@vega/db";
import { eq, asc, like } from "drizzle-orm";
import { getPaginationParams, paginateResponse, filterBySearch } from "../lib/pagination";

const router = Router();

// GET /api/team?page=1&limit=20&search=faisal
router.get("/", async (req, res) => {
  try {
    const { page, limit, search } = getPaginationParams(req);

    if (db) {
      if (search) {
        const all = await db.select().from(teamMembers).where(like(teamMembers.name, `%${search}%`)).orderBy(asc(teamMembers.displayOrder));
        return res.json(paginateResponse(all, page, limit));
      }
      const all = await db.select().from(teamMembers).orderBy(asc(teamMembers.displayOrder));
      return res.json(paginateResponse(all, page, limit));
    }

    let filtered = [...MOCK_TEAM];
    if (search) filtered = filterBySearch(filtered, search, ["name", "designation", "department"]);
    res.json(paginateResponse(filtered, page, limit));
  } catch (error) {
    res.json(paginateResponse(MOCK_TEAM, 1, 20));
  }
});

router.post("/", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(teamMembers).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_TEAM.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create team member" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(teamMembers).set(req.body).where(eq(teamMembers.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_TEAM.find((t) => t.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "Team member not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update team member" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (db) {
      await db.delete(teamMembers).where(eq(teamMembers.id, Number(req.params.id)));
      return res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete team member" });
  }
});

export default router;
