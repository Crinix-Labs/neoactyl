import Express from "express";
import { Request, Response } from "@types/express";
import bcrypt from "bcrypt";
import User from "../models/User.ts";
import toml from "toml";
import fs from "node:fs";
import axios from "axios";

const router = Express.Router();

const config = toml.parse(fs.readFileSync("../config.toml", "utf-8"));

router.post("/api/register", async (req: Request, res: Response) => {
  const { username, email, firstname, lastname, password } = req.body;

  if (!email || !username || !password) {
    return res.json({
      success: false,
      status: "failed",
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.json({
        success: false,
        status: "failed",
        message: "User with that email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      coins: 0,
      ram: config.resources.ram,
      disk: config.resources.disk,
      cpu: config.resources.cpu,
      allocations: config.resources.allocations,
      databases: config.resources.database,
      backups: config.resources.backup,
      slots: config.resources.slots,
    });

    // Post to Pterodactyl API
    await axios.post(`${config.pterodactyl.panel}/api/application/users`, {
      email,
      username,
      first_name: firstname,
      last_name: lastname,
      password,
    }, {
      headers: {
        'Authorization': `Bearer ${config.pterodactyl.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    return res.json({ success: true, message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      success: false,
      status: "failed",
      message: "Internal server error",
    });
  }
});

export default router;