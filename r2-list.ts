import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "auto",
  endpoint: "https://d16ba0c6cfe9bdf633b76d29f5a79d49.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "6b8e1bc74bcccae20c6a80d2a6cf52e5",
    secretAccessKey: "34ef15ed5ac3fde10153e0617f889f9979b4fef92086f51f8da1876e4ae2bf46",
  },
  forcePathStyle: true,
});

async function list() {
  const cmd = new ListObjectsV2Command({
    Bucket: "vega-assets",
    Prefix: "banners/",
    MaxKeys: 10,
  });
  const resp = await s3Client.send(cmd);
  console.log("Found:", resp.Contents?.map((c) => c.Key) || []);
}

list().catch(console.error);
