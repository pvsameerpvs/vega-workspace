import { db, users } from "@vega/db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function seed() {
  const email = "admin@vega.com";
  const password = "admin123";
  const name = "Super Admin";
  const role = "super_admin";

  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing.length) {
    console.log("Admin user already exists:", email);
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const result = await db.insert(users).values({
    email,
    password: hashed,
    name,
    role: role,
    isActive: true,
  }).returning();

  console.log("Created admin user:", result[0].email);
  console.log("Password:", password);
}

seed().catch(console.error);
