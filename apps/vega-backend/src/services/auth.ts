import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, users, MOCK_USERS } from "@vega/db";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET || "vega-default-secret-change-me";

const revokedTokens = new Set<string>();

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
  isActive?: boolean;
}

function getUserFromDbOrMock(email: string): typeof users.$inferSelect | undefined {
  return MOCK_USERS.find((u) => u.email === email);
}

function getUserById(id: number): typeof users.$inferSelect | undefined {
  return MOCK_USERS.find((u) => u.id === id);
}

export async function registerUser(data: { email: string; password: string; name: string; role?: string }): Promise<AuthUser> {
  const { email, password, name, role = "sales_team" } = data;

  if (db) {
    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length) throw new Error("User already exists");
    const hashed = await bcrypt.hash(password, 10);
    const result = await db.insert(users).values({ email, password: hashed, name, role: role as any }).returning();
    const user = result[0];
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  const existing = MOCK_USERS.find((u) => u.email === email);
  if (existing) throw new Error("User already exists");
  const newUser = {
    id: MOCK_USERS.length + 1,
    email,
    password: await bcrypt.hash(password, 10),
    name,
    role,
    avatar: null as any,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  MOCK_USERS.push(newUser as any);
  return { id: newUser.id, name, email, role };
}

export async function loginUser(data: { email: string; password: string }): Promise<{ token: string; refreshToken: string; user: AuthUser }> {
  const { email, password } = data;
  let user: any;

  if (db) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    user = result[0];
  } else {
    user = getUserFromDbOrMock(email);
  }

  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  const refreshToken = jwt.sign({ id: user.id, type: "refresh" }, JWT_SECRET, { expiresIn: "30d" });

  return { token, refreshToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export async function getUserProfile(id: number): Promise<AuthUser> {
  let user: any;
  if (db) {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    user = result[0];
  } else {
    user = getUserById(id);
  }
  if (!user) throw new Error("User not found");
  return { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, isActive: user.isActive };
}

export function refreshAccessToken(refreshToken: string): { token: string } {
  if (revokedTokens.has(refreshToken)) throw new Error("Token revoked");
  const decoded = jwt.verify(refreshToken, JWT_SECRET) as { id: number; type: string };
  if (decoded.type !== "refresh") throw new Error("Invalid refresh token");
  const user = getUserById(decoded.id);
  if (!user) throw new Error("User not found");
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  return { token };
}

export function revokeToken(token: string): void {
  revokedTokens.add(token);
}

export async function getAllUsers(): Promise<AuthUser[]> {
  if (db) {
    const all = await db.select().from(users);
    return all.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, isActive: u.isActive }));
  }
  return MOCK_USERS.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, isActive: u.isActive }));
}
