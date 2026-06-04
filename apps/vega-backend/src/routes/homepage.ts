import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { cleanBody } from "../lib/utils";
import {
  getAllVideos, createVideo, updateVideo, deleteVideo,
  getAllPopularCategories, createPopularCategory, updatePopularCategory, deletePopularCategory,
  getAllIndustries, createIndustry, updateIndustry, deleteIndustry,
  getAllSpotlightItems, createSpotlightItem, updateSpotlightItem, deleteSpotlightItem,
  getAllCategoryShowcases, createCategoryShowcase, updateCategoryShowcase, deleteCategoryShowcase,
} from "../services/homepage";

const router = Router();

// Videos
router.get("/videos", async (_req, res) => {
  try {
    const data = await getAllVideos();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch videos" });
  }
});

router.post("/videos", authenticate, async (req, res) => {
  try {
    const data = await createVideo(cleanBody(req.body));
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create video" });
  }
});

router.put("/videos/:id", authenticate, async (req, res) => {
  try {
    const data = await updateVideo(Number(req.params.id), cleanBody(req.body));
    res.json(data);
  } catch (error: any) {
    res.status(error.message?.includes("not found") ? 404 : 500).json({ error: error.message || "Failed to update video" });
  }
});

router.delete("/videos/:id", authenticate, async (req, res) => {
  try {
    const data = await deleteVideo(Number(req.params.id));
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete video" });
  }
});

// Popular Categories
router.get("/popular-categories", async (_req, res) => {
  try {
    const data = await getAllPopularCategories();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch popular categories" });
  }
});

router.post("/popular-categories", authenticate, async (req, res) => {
  try {
    const data = await createPopularCategory(cleanBody(req.body));
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create popular category" });
  }
});

router.put("/popular-categories/:id", authenticate, async (req, res) => {
  try {
    const data = await updatePopularCategory(Number(req.params.id), cleanBody(req.body));
    res.json(data);
  } catch (error: any) {
    res.status(error.message?.includes("not found") ? 404 : 500).json({ error: error.message || "Failed to update popular category" });
  }
});

router.delete("/popular-categories/:id", authenticate, async (req, res) => {
  try {
    const data = await deletePopularCategory(Number(req.params.id));
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete popular category" });
  }
});

// Industries
router.get("/industries", async (_req, res) => {
  try {
    const data = await getAllIndustries();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch industries" });
  }
});

router.post("/industries", authenticate, async (req, res) => {
  try {
    const data = await createIndustry(cleanBody(req.body));
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create industry" });
  }
});

router.put("/industries/:id", authenticate, async (req, res) => {
  try {
    const data = await updateIndustry(Number(req.params.id), cleanBody(req.body));
    res.json(data);
  } catch (error: any) {
    res.status(error.message?.includes("not found") ? 404 : 500).json({ error: error.message || "Failed to update industry" });
  }
});

router.delete("/industries/:id", authenticate, async (req, res) => {
  try {
    const data = await deleteIndustry(Number(req.params.id));
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete industry" });
  }
});

// Spotlight Items
router.get("/spotlight", async (_req, res) => {
  try {
    const data = await getAllSpotlightItems();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch spotlight items" });
  }
});

router.post("/spotlight", authenticate, async (req, res) => {
  try {
    const data = await createSpotlightItem(cleanBody(req.body));
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create spotlight item" });
  }
});

router.put("/spotlight/:id", authenticate, async (req, res) => {
  try {
    const data = await updateSpotlightItem(Number(req.params.id), cleanBody(req.body));
    res.json(data);
  } catch (error: any) {
    res.status(error.message?.includes("not found") ? 404 : 500).json({ error: error.message || "Failed to update spotlight item" });
  }
});

router.delete("/spotlight/:id", authenticate, async (req, res) => {
  try {
    const data = await deleteSpotlightItem(Number(req.params.id));
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete spotlight item" });
  }
});

// Category Showcases
router.get("/category-showcases", async (_req, res) => {
  try {
    const data = await getAllCategoryShowcases();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch category showcases" });
  }
});

router.post("/category-showcases", authenticate, async (req, res) => {
  try {
    const data = await createCategoryShowcase(cleanBody(req.body));
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create category showcase" });
  }
});

router.put("/category-showcases/:id", authenticate, async (req, res) => {
  try {
    const data = await updateCategoryShowcase(Number(req.params.id), cleanBody(req.body));
    res.json(data);
  } catch (error: any) {
    res.status(error.message?.includes("not found") ? 404 : 500).json({ error: error.message || "Failed to update category showcase" });
  }
});

router.delete("/category-showcases/:id", authenticate, async (req, res) => {
  try {
    const data = await deleteCategoryShowcase(Number(req.params.id));
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete category showcase" });
  }
});

export default router;
