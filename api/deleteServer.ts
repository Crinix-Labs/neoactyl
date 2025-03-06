import Express from "express";
import axios from "axios";
import toml from "toml";
import fs from "node:fs";
import path from "node:path";
import User from "../models/User.ts";
import Server from "../models/Server.ts";

const router = Express.Router();

const configPath = path.resolve(process.cwd(), "config.toml");
const config = toml.parse(fs.readFileSync(configPath, "utf-8"));

router.delete("/api/server/", async (req, res) => {
    const serverId = req.body.serverId;
    const username = req.body.username;
    console.log(req.body, req.params)
    if (!serverId || !username) {
        return res.status(400).json({ status: "failed", message: "Server ID and username are required" });
    }

    try {
        const usert = await User.findOne({ where: { username } });
        if (!usert) {
            return res.status(400).json({ status: "failed", message: "Invalid user, illegal access" });
        }

        // Fetch server details from Pterodactyl
        const serverRes = await axios.get(`${config.pterodactyl.panel}/api/application/servers/${serverId}`, {
            headers: {
                Authorization: `Bearer ${config.pterodactyl.api}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        const server = serverRes.data.attributes;

        // Delete the server from Pterodactyl
        await axios.delete(`${config.pterodactyl.panel}/api/application/servers/${serverId}`, {
            headers: {
                Authorization: `Bearer ${config.pterodactyl.api}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        // Restore the allocated resources to the user's available resources
        usert.ram += server.limits.memory;
        usert.disk += server.limits.disk;
        usert.cpu += server.limits.cpu;
        usert.servers -= 1;
        await usert.save();

        // Delete the server record from the database
        await Server.destroy({ where: { id: serverId } });

        return res.json({ status: "success", message: "Server deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting server:", error.response?.data || error.message);
        return res.status(error.response?.status || 500).json({
            status: "failed",
            message: error.response?.data?.errors?.[0]?.detail || "Internal server error",
        });
    }
});

export default router;