import { db, homeVideos, popularCategories, industries, MOCK_VIDEOS, MOCK_POPULAR_CATEGORIES, MOCK_INDUSTRIES } from "@vega/db";
import { eq, asc } from "drizzle-orm";

export async function getAllVideos() {
  if (db) return db.select().from(homeVideos).orderBy(asc(homeVideos.displayOrder));
  return MOCK_VIDEOS;
}

export async function createVideo(data: any) {
  if (db) {
    const result = await db.insert(homeVideos).values(data).returning();
    return result[0];
  }
  return { ...data, id: MOCK_VIDEOS.length + 1 };
}

export async function updateVideo(id: number, data: any) {
  if (db) {
    const result = await db.update(homeVideos).set(data).where(eq(homeVideos.id, id)).returning();
    return result[0];
  }
  const found = MOCK_VIDEOS.find((v) => v.id === id);
  if (!found) throw new Error("Video not found");
  return { ...found, ...data };
}

export async function deleteVideo(id: number) {
  if (db) {
    await db.delete(homeVideos).where(eq(homeVideos.id, id));
  }
  return { success: true };
}

export async function getAllPopularCategories() {
  if (db) return db.select().from(popularCategories).orderBy(asc(popularCategories.displayOrder));
  return MOCK_POPULAR_CATEGORIES;
}

export async function createPopularCategory(data: any) {
  if (db) {
    const result = await db.insert(popularCategories).values(data).returning();
    return result[0];
  }
  return { ...data, id: MOCK_POPULAR_CATEGORIES.length + 1 };
}

export async function updatePopularCategory(id: number, data: any) {
  if (db) {
    const result = await db.update(popularCategories).set(data).where(eq(popularCategories.id, id)).returning();
    return result[0];
  }
  const found = MOCK_POPULAR_CATEGORIES.find((c) => c.id === id);
  if (!found) throw new Error("Popular category not found");
  return { ...found, ...data };
}

export async function deletePopularCategory(id: number) {
  if (db) {
    await db.delete(popularCategories).where(eq(popularCategories.id, id));
  }
  return { success: true };
}

export async function getAllIndustries() {
  if (db) return db.select().from(industries).orderBy(asc(industries.displayOrder));
  return MOCK_INDUSTRIES;
}

export async function createIndustry(data: any) {
  if (db) {
    const result = await db.insert(industries).values(data).returning();
    return result[0];
  }
  return { ...data, id: MOCK_INDUSTRIES.length + 1 };
}

export async function updateIndustry(id: number, data: any) {
  if (db) {
    const result = await db.update(industries).set(data).where(eq(industries.id, id)).returning();
    return result[0];
  }
  const found = MOCK_INDUSTRIES.find((i) => i.id === id);
  if (!found) throw new Error("Industry not found");
  return { ...found, ...data };
}

export async function deleteIndustry(id: number) {
  if (db) {
    await db.delete(industries).where(eq(industries.id, id));
  }
  return { success: true };
}
