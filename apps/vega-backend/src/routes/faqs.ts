import { Router } from "express";
import { db, faqs } from "@vega/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const all = await db.select().from(faqs).orderBy(asc(faqs.displayOrder));
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.insert(faqs).values(req.body).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create FAQ" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.delete(faqs).where(eq(faqs.id, Number(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete FAQ" });
  }
});

export default router;
