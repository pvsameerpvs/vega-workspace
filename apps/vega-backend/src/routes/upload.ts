import { Router } from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { generateFilePath } from "@vega/utils";
import { authenticate } from "../middleware/auth";

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

router.post("/presigned", authenticate, async (req, res) => {
  try {
    const { fileName, folder = "uploads" } = req.body;
    const key = generateFilePath(folder, fileName);

    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: key,
      ContentType: "application/octet-stream",
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;

    res.json({ uploadUrl: url, publicUrl, key });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

router.post("/file", authenticate, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const folder = req.body.folder || "uploads";
    const key = generateFilePath(folder, req.file.originalname);
    const bucketUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL || "";

    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype || "application/octet-stream",
    });

    await s3Client.send(command);
    const publicUrl = bucketUrl ? `${bucketUrl}/${key}` : "";
    res.json({ publicUrl, key });
  } catch (error) {
    console.error("[upload] error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

export default router;
