import { Router } from "express";
import { db, translations } from "@vega/db";
import { eq, and } from "drizzle-orm";
import { authenticate } from "../middleware/auth";
import { cleanBody } from "../lib/utils";

const router = Router();

// GET /api/translations?lang=en&group=nav
router.get("/", async (req, res) => {
  try {
    const { lang, group } = req.query;
    const conditions = [];

    if (lang && (lang === "en" || lang === "ar")) {
      conditions.push(eq(translations.language, lang as "en" | "ar"));
    }

    if (group) conditions.push(eq(translations.group, group as string));

    if (conditions.length === 0) {
      const all = await db.select().from(translations);
      return res.json(all);
    }

    if (conditions.length === 1) {
      const all = await db
        .select()
        .from(translations)
        .where(conditions[0]);
      return res.json(all);
    }

    const all = await db
      .select()
      .from(translations)
      .where(and(conditions[0], conditions[1]));
    return res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch translations" });
  }
});

// POST /api/translations
router.post("/", authenticate, async (req, res) => {
  try {
    const result = await db
      .insert(translations)
      .values(cleanBody(req.body))
      .returning();
    return res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create translation" });
  }
});

// PUT /api/translations/:id
router.put("/:id", authenticate, async (req, res) => {
  try {
    const result = await db
      .update(translations)
      .set(cleanBody(req.body))
      .where(eq(translations.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Translation not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update translation" });
  }
});

// DELETE /api/translations/:id
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await db
      .delete(translations)
      .where(eq(translations.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete translation" });
  }
});

export default router;
