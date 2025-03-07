import Express from "express";
import Server from "../models/Server.ts";
import User from "../models/User.ts";
import checkAuth from "../middleware/checkAuth.ts";

const router = Express.Router();

router.post("/api/renew", checkAuth, async (req, res) => {
  const { serverId } = req.body;
  const username = req.user.username;

  if (!serverId) {
    return res
      .status(400)
      .json({
        status: "failed",
        message: "Server ID and username are required",
      });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid user, illegal access" });
    }

    const server = await Server.findByPk(serverId);
    if (!server) {
      return res
        .status(404)
        .json({ status: "failed", message: "Server not found" });
    }

    const now = new Date();
    server.lastRenewal = now;
    server.nextRenewal = new Date(
      now.getTime() + config.renewal.period * 24 * 60 * 60 * 1000
    ); // Assuming period is in days
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
