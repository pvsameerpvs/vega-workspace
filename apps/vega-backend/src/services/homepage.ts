import { db, homeVideos, popularCategories, industries } from "@vega/db";
import { eq, asc } from "drizzle-orm";

export async function getAllVideos() {
  return db.select().from(homeVideos).orderBy(asc(homeVideos.displayOrder));
}

export async function createVideo(data: any) {
  const result = await db.insert(homeVideos).values(data).returning();
  return result[0];
}

export async function updateVideo(id: number, data: any) {
  const result = await db
    .update(homeVideos)
    .set(data)
    .where(eq(homeVideos.id, id))
    .returning();
  return result[0];
}

export async function deleteVideo(id: number) {
  await db.delete(homeVideos).where(eq(homeVideos.id, id));
  return { success: true };
}

export async function getAllPopularCategories() {
  return db
    .select()
    .from(popularCategories)
    .orderBy(asc(popularCategories.displayOrder));
}

export async function createPopularCategory(data: any) {
  const result = await db.insert(popularCategories).values(data).returning();
  return result[0];
}

export async function updatePopularCategory(id: number, data: any) {
  const result = await db
    .update(popularCategories)
    .set(data)
    .where(eq(popularCategories.id, id))
    .returning();
  return result[0];
}

export async function deletePopularCategory(id: number) {
  await db.delete(popularCategories).where(eq(popularCategories.id, id));
  return { success: true };
}

export async function getAllIndustries() {
  return db.select().from(industries).orderBy(asc(industries.displayOrder));
}

export async function createIndustry(data: any) {
  const result = await db.insert(industries).values(data).returning();
  return result[0];
}

export async function updateIndustry(id: number, data: any) {
  const result = await db
    .update(industries)
    .set(data)
    .where(eq(industries.id, id))
    .returning();
  return result[0];
}

export async function deleteIndustry(id: number) {
  await db.delete(industries).where(eq(industries.id, id));
  return { success: true };
}
