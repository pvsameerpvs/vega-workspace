import { Router } from "express";
import {
  getAllVideos, createVideo, updateVideo, deleteVideo,
  getAllPopularCategories, createPopularCategory, updatePopularCategory, deletePopularCategory,
  getAllIndustries, createIndustry, updateIndustry, deleteIndustry,
  getAllSpotlightItems, createSpotlightItem, updateSpotlightItem, deleteSpotlightItem,
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

router.post("/videos", async (req, res) => {
  try {
    const data = await createVideo(req.body);
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create video" });
  }
});

router.put("/videos/:id", async (req, res) => {
  try {
    const data = await updateVideo(Number(req.params.id), req.body);
    res.json(data);
  } catch (error: any) {
    res.status(error.message?.includes("not found") ? 404 : 500).json({ error: error.message || "Failed to update video" });
  }
});

router.delete("/videos/:id", async (req, res) => {
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

router.post("/popular-categories", async (req, res) => {
  try {
    const data = await createPopularCategory(req.body);
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create popular category" });
  }
});

router.put("/popular-categories/:id", async (req, res) => {
  try {
    const data = await updatePopularCategory(Number(req.params.id), req.body);
    res.json(data);
  } catch (error: any) {
    res.status(error.message?.includes("not found") ? 404 : 500).json({ error: error.message || "Failed to update popular category" });
  }
});

router.delete("/popular-categories/:id", async (req, res) => {
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

router.post("/industries", async (req, res) => {
  try {
    const data = await createIndustry(req.body);
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create industry" });
  }
});

router.put("/industries/:id", async (req, res) => {
  try {
    const data = await updateIndustry(Number(req.params.id), req.body);
    res.json(data);
  } catch (error: any) {
    res.status(error.message?.includes("not found") ? 404 : 500).json({ error: error.message || "Failed to update industry" });
  }
});

router.delete("/industries/:id", async (req, res) => {
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

router.post("/spotlight", async (req, res) => {
  try {
    const data = await createSpotlightItem(req.body);
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create spotlight item" });
  }
});

router.put("/spotlight/:id", async (req, res) => {
  try {
    const data = await updateSpotlightItem(Number(req.params.id), req.body);
    res.json(data);
  } catch (error: any) {
    res.status(error.message?.includes("not found") ? 404 : 500).json({ error: error.message || "Failed to update spotlight item" });
  }
});

router.delete("/spotlight/:id", async (req, res) => {
  try {
    const data = await deleteSpotlightItem(Number(req.params.id));
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete spotlight item" });
  }
});

export default router;
