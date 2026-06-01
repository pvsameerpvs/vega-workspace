import { Router } from "express";
import { db, gallery } from "@vega/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const all = await db.select().from(gallery).orderBy(asc(gallery.displayOrder));
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.insert(gallery).values(req.body).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create gallery item" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.delete(gallery).where(eq(gallery.id, Number(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete gallery item" });
  }
});

export default router;
