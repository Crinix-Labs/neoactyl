import express from "express";
import config from "../controller/config.ts";
import axios from "axios";
import checkAuth from "../middleware/checkAuth.ts";
import Server from "../models/Server.ts";

const router = express.Router;

router.get("/servers/", checkAuth, (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: "failed", message: "user not found" });
  }
  const servers = await axios.get(
    `${config.pterodactyl.panel}/api/application/users/${req.user.id}/?include=servers`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.pterodactyl.api}`,
      },
    }
  );
  res.json(servers);
});
