import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, users, MOCK_USERS } from "@vega/db";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user;
    if (db) {
      const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
      user = result[0];
    } else {
      user = MOCK_USERS.find((u) => u.email === email);
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
