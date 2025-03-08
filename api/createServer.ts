import Express from "express";
import axios from "axios";
import toml from "toml";
import fs from "node:fs";
import path from "node:path";
import getEggs from "../controller/getEggs.ts";
import User from "../models/User.ts";
import Server from "../models/Server.ts";
import checkAuth from "../middleware/checkAuth.ts";

const router = Express.Router();

const configPath = path.resolve(process.cwd(), "config.toml");
const config = toml.parse(fs.readFileSync(configPath, "utf-8"));

async function getRandomAllocation(node: string): Promise<number> {
  try {
    const response = await axios.get(
      `${config.pterodactyl.panel}/api/application/nodes/${node}/allocations`,
      {
        headers: {
          Authorization: `Bearer ${config.pterodactyl.api}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const allocations = response.data.data.filter(
      (allocation: any) => !allocation.attributes.assigned
    );
    if (allocations.length === 0) {
      throw new Error("No available allocations");
    }

    const randomIndex = Math.floor(Math.random() * allocations.length);
    return allocations[randomIndex].attributes.id;
  } catch (error) {
    console.error(
      "Error fetching allocations:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch available allocations");
  }
}

router.post("/api/server", checkAuth, async (req, res) => {
  const { name, egg_id, ram, disk, cpu, allocation, database, node, backups } =
    req.body;
  const username = req.user.username;
  if (!name || !egg_id || !username || !ram || !disk || !cpu || !node) {
    return res
      .status(400)
      .json({ status: "failed", message: "All fields are required" });
  }

  try {
    const usert = await User.findOne({ where: { username } });
    if (!usert) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid user, illegal access" });
    }
    if (usert.servers >= usert.slots) {
      return res
        .status(400)
        .json({ status: "failed", message: "Server Limit reached!" });
    }
    if (usert.ram < ram) {
      return res
        .status(400)
        .json({ status: "failed", message: "Insufficient RAM available" });
    }
    if (usert.disk < disk) {
      return res.status(400).json({
        status: "failed",
        message: "Insufficient disk space available",
      });
    }
    if (usert.cpu < cpu) {
      return res
        .status(400)
        .json({ status: "failed", message: "Insufficient CPU available" });
    }

    const user = usert.id;

    const eggs = await getEggs("./eggs");

    const egg = eggs.find((e) => e.id === egg_id);
    if (!egg) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Egg ID" });
    }
    if (!egg.enabled) {
      return res
        .status(403)
        .json({ status: "declined", message: "This egg is disabled" });
    }

    const allocationId = await getRandomAllocation(node);

    const body = {
      name,
      user,
      egg: egg_id,
      docker_image: egg.docker_image,
      startup: egg.startup,
      limits: {
        memory: ram,
        swap: 0,
        disk,
        io: 500,
        cpu,
      },
      feature_limits: {
        databases: database || 0,
        backups: backups || 0,
        allocations: allocation || 0,
      },
      allocation: {
        default: allocationId,
      },
      environment: {},
    };

    egg.variables.forEach((variable) => {
      body.environment[variable.env_variable] = variable.default_value;
    });

    const serverRes = await axios.post(
      `${config.pterodactyl.panel}/api/application/servers`,
      body,
      {
        headers: {
          Authorization: `Bearer ${config.pterodactyl.api}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    // Deduct the allocated resources from the user's available resources
    usert.ram -= ram;
    usert.disk -= disk;
    usert.cpu -= cpu;
    usert.servers += 1;
    await usert.save();

    // Create a new server record in the database
    await Server.create({
      id: serverRes.attributes.id,
      lastRenewal: new Date(),
      nextRenewal: new Date(
        Date.now() + config.renewal.period * 24 * 60 * 60 * 1000
      ), // Assuming period is in days
    });

    return res.json({
      status: "success",
      message: "Server created successfully",
    });
  } catch (error: any) {
    console.error(
      "Error creating server:",
      error.response?.data || error.message
    );
    return res.status(error.response?.status || 500).json({
      status: "failed",
      message:
        error.response?.data?.errors?.[0]?.detail || "Internal server error",
    });
  }
});

export default router;
