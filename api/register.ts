import Express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.ts";
import toml from "toml";
import fs from "node:fs";
import axios from "axios";
import { Op } from "sequelize";

const router = Express.Router();

const config = toml.parse(
  fs.readFileSync(process.cwd() + "/config.toml", "utf-8")
);

router.post("/api/register", async (req, res) => {
  const { username, email, firstname, lastname, password } = req.body;

  if (!email || !username || !password) {
    return res.json({
      success: false,
      status: "failed",
      message: "All fields are required",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.json({
        success: false,
        status: "failed",
        message: "User with that email or username already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Post to Pterodactyl API
    const response = await axios.post(
      `${config.pterodactyl.panel}/api/application/users`,
      {
        email,
        username,
        first_name: firstname,
        last_name: lastname,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${config.pterodactyl.api}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    // Create user in the database
    const newUser = await User.create({
      id: response.data.attributes.id, // Make sure this is correct based on Pterodactyl's API response
      username,
      email,
      password: hashedPassword,
    });

    delete newUser.password; // Prevent sending the password in the response

    return res.json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
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
