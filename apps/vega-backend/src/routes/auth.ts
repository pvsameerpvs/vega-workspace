import { Router } from "express";
import { z } from "zod";
import { validateBody } from "../middleware/validate";
import { authenticate, AuthRequest } from "../middleware/auth";
import { registerUser, loginUser, getUserProfile, refreshAccessToken, revokeToken, getAllUsers } from "../services/auth";

const router = Router();

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["super_admin", "product_manager", "content_editor", "hr_manager", "sales_team"]).optional(),
});

router.post("/register", validateBody(registerSchema), async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(error.message === "User already exists" ? 400 : 500).json({ error: error.message || "Registration failed" });
  }
});

router.post("/login", validateBody(loginSchema), async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(error.message === "Invalid credentials" ? 401 : 500).json({ error: error.message || "Login failed" });
  }
});

router.get("/me", authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await getUserProfile(req.user!.id);
    res.json(user);
  } catch (error: any) {
    res.status(error.message === "User not found" ? 404 : 500).json({ error: error.message || "Failed to fetch user" });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "Refresh token required" });
    const result = await refreshAccessToken(refreshToken);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message || "Invalid refresh token" });
  }
});

router.post("/logout", authenticate, (req: AuthRequest, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) revokeToken(token);
  res.json({ success: true, message: "Logged out" });
});

router.get("/users", authenticate, async (req: AuthRequest, res) => {
  try {
    if (req.user!.role !== "super_admin") return res.status(403).json({ error: "Forbidden" });
    const users = await getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch users" });
  }
});

export default router;
