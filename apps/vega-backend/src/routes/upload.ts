import { Router } from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { generateFilePath } from "@vega/utils";

const router = Router();

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

router.post("/presigned", async (req, res) => {
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

export default router;
