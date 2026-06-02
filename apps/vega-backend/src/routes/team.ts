import { Router } from "express";
import { db, teamMembers, MOCK_TEAM } from "@vega/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    if (db) {
      const all = await db.select().from(teamMembers).orderBy(asc(teamMembers.displayOrder));
      return res.json(all);
    }
    res.json(MOCK_TEAM);
  } catch (error) {
    res.json(MOCK_TEAM);
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
