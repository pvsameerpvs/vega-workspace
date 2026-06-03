import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import categoryRoutes from "./routes/categories";
import leadRoutes from "./routes/leads";
import blogRoutes from "./routes/blog";
import galleryRoutes from "./routes/gallery";
import catalogRoutes from "./routes/catalogs";
import careerRoutes from "./routes/careers";
import teamRoutes from "./routes/team";
import faqRoutes from "./routes/faqs";
import settingsRoutes from "./routes/settings";
import uploadRoutes from "./routes/upload";
import homepageRoutes from "./routes/homepage";
import translationRoutes from "./routes/translations";
import searchRoutes from "./routes/search";

import { errorHandler, notFoundHandler } from "./middleware/error";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  process.env.DASHBOARD_URL || "http://localhost:3001",
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked origin: ${origin}`));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/catalogs", catalogRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/translations", translationRoutes);
app.use("/api/search", searchRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  // Server is running
});
