import express from "express";
import fs from "node:fs";
import toml from "toml";
import path from "node:path";

const config = toml.parse(fs.readFileSync(path.resolve(process.cwd(), "config.toml"), "utf-8"));

const router = express.Router();

router.get("/api/config", (req, res) => {
    delete config.general.jwtSecret;
    delete config.database
    delete config.discord.ClientSecret;
    delete config.pterodactyl.api
    res.json(config);
});

export default router;