import { Router } from "express";
import { db, catalogs } from "@vega/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const all = await db.select().from(catalogs).orderBy(desc(catalogs.createdAt));
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch catalogs" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.insert(catalogs).values(req.body).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create catalog" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.delete(catalogs).where(eq(catalogs.id, Number(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete catalog" });
  }
});

export default router;
