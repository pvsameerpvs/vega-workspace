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
import googleReviewsRoutes from "./routes/google-reviews";

import { errorHandler, notFoundHandler } from "./middleware/error";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  process.env.DASHBOARD_URL || "http://localhost:3001",
].filter(Boolean);

// Allow Railway preview URLs (*.up.railway.app) and custom domains
const isAllowedOrigin = (origin: string | undefined) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (origin.endsWith(".up.railway.app")) return true;
  if (process.env.NODE_ENV === "development") return true;
  return false;
};

app.use(cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
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
app.use("/api/google-reviews", googleReviewsRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`[Vega API] Server running on port ${PORT}`);
  console.log(`[Vega API] Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`[Vega API] Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
const shutdown = (signal: string) => {
  console.log(`[Vega API] ${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log("[Vega API] Server closed.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
