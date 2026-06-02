import { Router } from "express";
import { db, gallery, MOCK_GALLERY } from "@vega/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    if (db) {
      const all = await db.select().from(gallery).orderBy(asc(gallery.displayOrder));
      return res.json(all);
    }
    res.json(MOCK_GALLERY);
  } catch (error) {
    res.json(MOCK_GALLERY);
  }
});

router.post("/", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(gallery).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_GALLERY.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create gallery item" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(gallery).set(req.body).where(eq(gallery.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_GALLERY.find((g) => g.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "Gallery item not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update gallery item" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (db) {
      await db.delete(gallery).where(eq(gallery.id, Number(req.params.id)));
      return res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete gallery item" });
  }
});

export default router;
