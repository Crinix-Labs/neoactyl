import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/accounts.ts";
import Settings from "../models/settings.ts";

const settings: any = async (setting: string) => {
  return await Settings.findOne({ where: {
    setting
  }}).value;
}

const router = express.Router();
const saltRounds = 10;
const JWT_SECRET = settings("secret");

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.json({ message: "All fields are required", success: false });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({ message: "User registered successfully", success: true, user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    return res.json({ error: "No username or email provided", success: false });
  }

  try {
    const user = await User.findOne({ where: { username } }) ||
                 await User.findOne({ where: { email } });

    if (!user) return res.json({ error: "User not found", success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ error: "Invalid credentials", success: false });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

export default router;