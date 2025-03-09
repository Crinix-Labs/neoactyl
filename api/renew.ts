import Express from "express";
import Server from "../models/Server.ts";
import User from "../models/User.ts";
import checkAuth from "../middleware/checkAuth.ts";
import config from "../controller/config.ts"; // Assuming config contains renewal period
import { CronJob } from "cron";
import { Op } from "sequelize";
import axios from "axios";

const router = Express.Router();

const renewalChecker = new CronJob(
  "* * * * *", // Runs every minute
  async function () {
    try {
      const renewalThreshold = new Date();
      renewalThreshold.setDate(
        renewalThreshold.getDate() - config.renewal.period
      );

      // Find expired servers
      const expiredServers = await Server.findAll({
        where: { lastRenewal: { [Op.lt]: renewalThreshold } },
      });

      if (expiredServers.length === 0) {
        console.log("✅ No expired servers.");
      } else {
        console.log("⚠️ Expired servers found:");
        expiredServers.forEach((server) => {
          console.log(
            `- Server ID: ${server.id}, Last Renewal: ${server.lastRenewal}`
          );
        });
      }
    } catch (error) {
      console.error("❌ Error checking server renewals:", error);
    }
  },
  null,
  true,
  "Asia/Kolkata"
);

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
    server.lastRenewal = new Date();
    await server.save();

    return res.json({
      status: "success",
      message: "Server renewed successfully",
    });
  } catch (error) {
    console.error("Error renewing server:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
});

export default router;
export { renewalChecker };
