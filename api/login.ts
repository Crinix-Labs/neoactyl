import Express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.ts";
import toml from "toml";
import fs from "node:fs";

const router = Express.Router();

const config = toml.parse(fs.readFileSync("../config.toml", "utf-8"));

router.post("/api/login", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    return res.json({
      success: false,
      status: "failed",
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({
      where: {
        email,
        username,
      },
    });

    if (!user) {
      return res.json({
        success: false,
        status: "failed",
        message: "No user found with that credentials",
      });
    }
     
    if (bcrypt.verify(password, user.password)) {
      return res.json({
        success: false,
        status: "failed",
        message: "Password mismatched, try again or reset your password",
      });
    }

    // Generate token with environment secret key
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      config.general.jwtSecret,
      { expiresIn: "1h" }
    );

    // Set token as an HttpOnly cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" || false,
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    return res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      status: "failed",
      message: "Internal server error",
    });
  }
});

export default router;
