import express from "express";
import fs from "node:fs";
import toml from "toml";
import path from "node:path";
import checkAuth from "../middleware/checkAuth.ts";

const config = toml.parse(
  fs.readFileSync(path.resolve(process.cwd(), "config.toml"), "utf-8")
);

const router = express.Router();

router.get("/api/config", checkAuth, (req, res) => {
  if (!req.user.admin) {
    return res.json({ success: false, message: "access denied, not a admin" });
  }
  delete config.general.jwtSecret;
  delete config.database;
  delete config.discord.ClientSecret;
  delete config.pterodactyl.api;
  res.json(config);
});

export default router;
