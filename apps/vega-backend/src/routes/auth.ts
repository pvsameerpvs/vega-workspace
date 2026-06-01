import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, users } from "@vega/db";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user.length) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user[0].password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user[0].id, email: user[0].email, role: user[0].role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ token, user: { id: user[0].id, name: user[0].name, email: user[0].email, role: user[0].role } });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
