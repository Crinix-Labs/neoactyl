import Express from "express";
import Server from "../models/Server.ts";
import User from "../models/User.ts";
import checkAuth from "../middleware/checkAuth.ts";
import config from "../controller/config.ts";
import { CronJob } from "cron";
import axios from "axios";
import { Op } from "sequelize";

const router = Express.Router();

const renewalChecker = new CronJob(
  "* * * * *", // Runs every minute
  async function () {
    try {
      if (!config.renewal?.enabled) {
        console.log("\x1b[33m%s\x1b[0m", "⚠️ Renewal system is disabled.");
        return;
      }

      if (
        typeof config.renewal.period === "undefined" ||
        config.renewal.period < 0
      ) {
        console.error(
          "\x1b[31m%s\x1b[0m",
          "❌ Renewal period is not properly set in config."
        );
        return;
      }

      if (
        typeof config.renewal?.deletionPeriod === "undefined" ||
        config.renewal.deletionPeriod < 0
      ) {
        console.error(
          "\x1b[31m%s\x1b[0m",
          "❌ Deletion period is not properly set in config."
        );
        return;
      }

      const now = new Date();
      const renewalThreshold = new Date();
      renewalThreshold.setDate(now.getDate() - config.renewal.period);

      const deletionThreshold = new Date();
      deletionThreshold.setDate(
        renewalThreshold.getDate() - config.renewal.deletionPeriod
      );

      // Find servers that are expired
      const expiredServers = await Server.findAll({
        where: { lastRenewal: { [Op.lt]: renewalThreshold } },
      });

      if (expiredServers.length === 0) {
        console.log("\x1b[32m%s\x1b[0m", "✅ No expired servers.");
        return;
      }

      console.log("\n\x1b[33m%s\x1b[0m", "⚠️ Expired servers found:");

      for (const server of expiredServers) {
        const lastRenewalDate = new Date(server.lastRenewal);

        if (lastRenewalDate < deletionThreshold) {
          // DELETE SERVER IF IT'S PAST THE DELETION PERIOD
          console.log(
            "\x1b[31m%s\x1b[0m",
            `❌ Server ${server.id} is past deletion time. Deleting...`
          );
          try {
            // Fetch the server resources from Pterodactyl API

            const serverResources = await axios.get(
              `${config.pterodactyl.panel}/api/application/servers/${server.id}/resources`,
              {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${config.pterodactyl.api}`,
                },
              }
            );

            await axios.delete(
              `${config.pterodactyl.panel}/api/application/servers/${server.id}`,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${config.pterodactyl.api}`,
                },
              }
            );

            // Get the resources usage (RAM, CPU, Disk, etc.) from the API response
            const { ram, disk, cpu, databases, allocations } =
              serverResources.data.attributes;

            // Restore user resources
            const user = await User.findByPk(server.ownerId);
            if (user) {
              user.ram += ram;
              user.disk += disk;
              user.cpu += cpu;
              user.databases += databases;
              user.allocations += allocations;
              user.servers -= 1;
              await user.save();
              console.log(
                "\x1b[32m%s\x1b[0m",
                `✅ Resources returned to user: ${user.username}`
              );
            }

            await server.destroy(); // Remove from database
            console.log("\x1b[31m%s\x1b[0m", `✅ Server ${server.id} deleted.`);
          } catch (err) {
            console.error(
              "\x1b[31m%s\x1b[0m",
              `❌ Failed to delete server ${server.id}:`,
              err.message
            );
          }
        } else {
          // CHECK IF SERVER IS ALREADY SUSPENDED BEFORE SUSPENDING
          if (!server.suspended) {
            console.log(
              "\x1b[33m%s\x1b[0m",
              `- Suspending server: ${server.id}`
            );
            try {
              await axios.post(
                `${config.pterodactyl.panel}/api/application/servers/${server.id}/suspend`,
                {},
                {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${config.pterodactyl.api}`,
                  },
                }
              );

              server.suspended = true; // Mark server as suspended
              await server.save();

              console.log(
                "\x1b[32m%s\x1b[0m",
                `- Server: ${server.id} suspended.`
              );
            } catch (err) {
              console.error(
                "\x1b[31m%s\x1b[0m",
                `❌ Failed to suspend server ${server.id}:`,
                err.message
              );
            }
          } else {
            console.log(
              "\x1b[36m%s\x1b[0m",
              `- Server: ${server.id} is already suspended. Skipping...`
            );
          }
        }
      }
    } catch (error) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "❌ Error checking server renewals:",
        error
      );
    }
  },
  null,
  true, // Start automatically
  "Asia/Kolkata"
);

renewalChecker.start();

// Renew a single server manually
router.post("/api/renew/:serverId", checkAuth, async (req, res) => {
  const { serverId } = req.params;
  const username = req.user.username;

  if (!serverId) {
    return res.status(400).json({
      status: "failed",
      message: "Server ID is required",
    });
  }

  try {
    if (!config.renewal?.enabled) {
      return res.status(403).json({
        status: "failed",
        message: "Server renewal is currently disabled.",
      });
    }

    // Validate user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(403)
        .json({ status: "failed", message: "Unauthorized access" });
    }

    // Find server
    const server = await Server.findByPk(serverId);
    if (!server) {
      return res
        .status(404)
        .json({ status: "failed", message: "Server not found" });
    }

    // Check if the server is eligible for renewal
    const lastRenewalDate = new Date(server.lastRenewal);
    const renewalThreshold = new Date();
    renewalThreshold.setDate(
      renewalThreshold.getDate() - config.renewal.period
    );

    if (lastRenewalDate > renewalThreshold) {
      return res.status(400).json({
        status: "failed",
        message: `Renewal not needed yet. Next renewal available after ${lastRenewalDate.toDateString()}`,
      });
    }

    // Renew the server
    await axios.post(
      `${config.pterodactyl.panel}/api/application/servers/${serverId}/unsuspend`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.pterodactyl.api}`,
        },
      }
    );

    console.log("\x1b[32m%s\x1b[0m", `- Server: ${serverId}, Unsuspended`);

    server.lastRenewal = new Date();
    server.suspended = false; // Mark as active
    await server.save();

    return res.json({
      status: "success",
      message: "Server renewed successfully",
    });
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "❌ Error renewing server:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
});

export default router;
export { renewalChecker };
