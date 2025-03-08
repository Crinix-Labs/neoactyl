import express from "express";
import User from "../models/User.ts";
import config from "../controller/config.ts";
import checkAuth from "../middleware/checkAuth.ts";
import axios from "axios";

const router = express.Router();

router.get("/api/@me", checkAuth, async (req, res) => {
  const id = req.user.id;

  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(401).json({
      success: false,
      message:
        "User couldn't be found in the database. Is this illegal access?",
    });
  }

  try {
    const ptrlUser = await axios.get(
      `${config.pterodactyl.panel}/api/application/users/${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.pterodactyl.api}`,
        },
      }
    );

    let mainUser = ptrlUser.data;
    mainUser.resources = {
      ram: user.ram,
      disk: user.disk,
      cpu: user.cpu,
      allocations: user.allocation,
      database: user.database,
    };

    return res.json(mainUser);
  } catch (error: any) {
    console.error(
      "Error fetching Pterodactyl user:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error retrieving user data from the panel",
    });
  }
});

export default router;
