import { Router } from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { db, careers, jobApplications } from "@vega/db";
import { eq, desc, like } from "drizzle-orm";
import { slugify, generateFilePath } from "@vega/utils";
import { authenticate } from "../middleware/auth";
import { cleanBody } from "../lib/utils";
import {
  getPaginationParams,
  paginateResponse,
} from "../lib/pagination";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
});

// GET /api/careers/jobs?page=1&limit=20&search=sales
router.get("/jobs", async (req, res) => {
  try {
    const { page, limit, search } = getPaginationParams(req);

    if (search) {
      const all = await db
        .select()
        .from(careers)
        .where(like(careers.title, `%${search}%`))
        .orderBy(desc(careers.createdAt));
      return res.json(paginateResponse(all, page, limit));
    }

    const all = await db
      .select()
      .from(careers)
      .orderBy(desc(careers.createdAt));
    return res.json(paginateResponse(all, page, limit));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

router.get("/applications", authenticate, async (req, res) => {
  try {
    const { page, limit, search } = getPaginationParams(req);

    if (search) {
      const all = await db
        .select()
        .from(jobApplications)
        .where(like(jobApplications.fullName, `%${search}%`))
        .orderBy(desc(jobApplications.createdAt));
      return res.json(paginateResponse(all, page, limit));
    }

    const all = await db
      .select()
      .from(jobApplications)
      .orderBy(desc(jobApplications.createdAt));
    return res.json(paginateResponse(all, page, limit));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

function ensureCareerSlug(body: any): any {
  if (!body.slug || String(body.slug).trim() === "") {
    body.slug = slugify(body.title || "job");
  }
  return body;
}

router.post("/jobs", authenticate, async (req, res) => {
  try {
    const body = ensureCareerSlug(cleanBody(req.body));
    if (!body.title || !body.slug) {
      return res.status(400).json({ error: "Title and slug are required" });
    }
    const result = await db.insert(careers).values(body).returning();
    return res.status(201).json(result[0]);
  } catch (error: any) {
    console.error("Create job error:", error);
    res.status(500).json({ error: error.message || "Failed to create job" });
  }
});

router.put("/jobs/:id", authenticate, async (req, res) => {
  try {
    const body = ensureCareerSlug(cleanBody(req.body));
    const result = await db
      .update(careers)
      .set(body)
      .where(eq(careers.id, Number(req.params.id)))
      .returning();

    if (!result.length) {
      return res.status(404).json({ error: "Job not found" });
    }

    return res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update job" });
  }
});

router.delete("/jobs/:id", authenticate, async (req, res) => {
  try {
    await db.delete(careers).where(eq(careers.id, Number(req.params.id)));
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

router.post("/applications", async (req, res) => {
  try {
    const body = cleanBody(req.body);
    if (!body.careerId || !body.fullName || !body.email || !body.phone || !body.position) {
      return res.status(400).json({ error: "careerId, fullName, email, phone, and position are required" });
    }
    const result = await db
      .insert(jobApplications)
      .values(body)
      .returning();
    return res.status(201).json(result[0]);
  } catch (error: any) {
    console.error("Submit application error:", error);
    res.status(500).json({ error: error.message || "Failed to submit application" });
  }
});

// Public CV upload for job applications
router.post("/upload-cv", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const key = generateFilePath("careers/cv", req.file.originalname);
    const bucketUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL || "";
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype || "application/pdf",
    });
    await s3Client.send(command);
    const publicUrl = bucketUrl ? `${bucketUrl}/${key}` : "";
    res.json({ publicUrl, key });
  } catch (error) {
    console.error("[upload-cv] error:", error);
    res.status(500).json({ error: "Failed to upload CV" });
  }
});

// Get single application (auth)
router.get("/applications/:id", authenticate, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await db.select().from(jobApplications).where(eq(jobApplications.id, id)).limit(1);
    if (!result.length) return res.status(404).json({ error: "Application not found" });
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch application" });
  }
});

// Update application status (auth)
router.put("/applications/:id/status", authenticate, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = cleanBody(req.body);
    if (!status) return res.status(400).json({ error: "status is required" });
    const result = await db
      .update(jobApplications)
      .set({ status, updatedAt: new Date() })
      .where(eq(jobApplications.id, id))
      .returning();
    if (!result.length) return res.status(404).json({ error: "Application not found" });
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// Delete application (auth)
router.delete("/applications/:id", authenticate, async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.delete(jobApplications).where(eq(jobApplications.id, id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete application" });
  }
});

export default router;
