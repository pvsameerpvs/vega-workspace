import { Router } from "express";
import { db, teamMembers } from "@vega/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const all = await db.select().from(teamMembers).orderBy(asc(teamMembers.displayOrder));
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.insert(teamMembers).values(req.body).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create team member" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.delete(teamMembers).where(eq(teamMembers.id, Number(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete team member" });
  }
});

export default router;
