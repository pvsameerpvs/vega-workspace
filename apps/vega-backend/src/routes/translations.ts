import { Router } from "express";
import { db, translations, MOCK_TRANSLATIONS } from "@vega/db";
import { eq, and } from "drizzle-orm";

const router = Router();

// GET /api/translations?lang=en&group=nav
router.get("/", async (req, res) => {
  try {
    const { lang, group } = req.query;

    if (db) {
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
        const all = await db.select().from(translations).where(conditions[0]);
        return res.json(all);
      }
      const all = await db.select().from(translations).where(and(conditions[0], conditions[1]));
      return res.json(all);
    }

    let filtered = [...MOCK_TRANSLATIONS];
    if (lang) filtered = filtered.filter((t) => t.language === lang);
    if (group) filtered = filtered.filter((t) => t.group === group);
    res.json(filtered);
  } catch (error) {
    res.json(MOCK_TRANSLATIONS);
  }
});

// POST /api/translations
router.post("/", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(translations).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_TRANSLATIONS.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create translation" });
  }
});

// PUT /api/translations/:id
router.put("/:id", async (req, res) => {
  try {
    if (db) {
      const result = await db.update(translations).set(req.body).where(eq(translations.id, Number(req.params.id))).returning();
      return res.json(result[0]);
    }
    const found = MOCK_TRANSLATIONS.find((t) => t.id === Number(req.params.id));
    if (!found) return res.status(404).json({ error: "Translation not found" });
    res.json({ ...found, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update translation" });
  }
});

// DELETE /api/translations/:id
router.delete("/:id", async (req, res) => {
  try {
    if (db) {
      await db.delete(translations).where(eq(translations.id, Number(req.params.id)));
      return res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete translation" });
  }
});

export default router;
