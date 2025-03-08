import express from "express";
import config from "../controller/config.ts";
import axios from "axios";
import checkAuth from "../middleware/checkAuth.ts";
import Server from "../models/Server.ts";

const router = express.Router();

router.get("/api/servers/", checkAuth, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }

  try {
    const response = await axios.get(
      `${config.pterodactyl.panel}/api/application/users/${req.user.id}/?include=servers`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.pterodactyl.api}`,
        },
      }
    );

    // Extract server list and filter out unnecessary fields
    let servers =
      response.data.attributes.relationships?.servers?.data.map(
        (server: any) => ({
          id: server.attributes.id,
          name: server.attributes.name,
          description: server.attributes.description,
          identifier: server.attributes.identifier,
          owner_id: server.attributes.user, // User who owns the server
          memory: server.attributes.limits.memory,
          disk: server.attributes.limits.disk,
          cpu: server.attributes.limits.cpu,
          databases: server.attributes.feature_limits.databases,
          allocations: server.attributes.feature_limits.allocations,
        })
      ) || [];

    if (servers.length > 0) {
      // Fetch renewal info for all server IDs
      const renewalInfo = await Server.findAll({
        where: {
          id: servers.map((s) => s.id),
        },
      });

      // Convert renewalInfo to a lookup table
      const renewalMap = renewalInfo.reduce((acc: any, info: any) => {
        acc[info.id] = info;
        return acc;
      }, {});

      // Attach renewal data to each server
      servers = servers.map((server) => ({
        ...server,
        renewal: renewalMap[server.id] || null, // Add renewal info or null if not found
      }));
    }

    return res.json({ success: true, servers });
  } catch (error) {
    console.error(
      "Error fetching servers:",
      error.response?.data || error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
