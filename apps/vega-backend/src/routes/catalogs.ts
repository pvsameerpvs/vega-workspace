import { Router } from "express";
import { db, catalogs, MOCK_CATALOGS } from "@vega/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    if (db) {
      const all = await db.select().from(catalogs).orderBy(desc(catalogs.createdAt));
      return res.json(all);
    }
    res.json(MOCK_CATALOGS);
  } catch (error) {
    res.json(MOCK_CATALOGS);
  }
});

router.post("/", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(catalogs).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_CATALOGS.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create catalog" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (db) {
      await db.delete(catalogs).where(eq(catalogs.id, Number(req.params.id)));
      return res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete catalog" });
  }
});

export default router;
