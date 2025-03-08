import Express from "express";
import getEggs from "../controller/getEggs.ts";
import fs from "node:fs/promises";
import path from "node:path";
import checkAuth from "../middleware/checkAuth.ts";

const router = Express.Router();
const EGGS_DIR = path.join(process.cwd(), "nodes");

// Get all eggs
router.get("/api/nodes", async (req, res) => {
  try {
    const eggs = await getEggs(EGGS_DIR);
    res.json(eggs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch eggs" });
  }
});

// Dynamically find and update 'enabled' property of an egg by ID
router.patch("/api/nodes/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  const { enabled } = req.body; // Expecting { "enabled": true } or { "enabled": false }

  if (!req.user.admin) {
    return res
      .status(401)
      .json({
        success: "deny",
        message: "The user doesn't have access to this.",
      });
  }
  if (typeof enabled !== "boolean") {
    return res
      .status(400)
      .json({ error: "Invalid request. 'enabled' must be true or false." });
  }

  try {
    const files = await fs.readdir(EGGS_DIR);
    let fileFound = false;

    for (const file of files) {
      const filePath = path.join(EGGS_DIR, file);
      const content = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(content);

      if (data.id && data.id.toString() === id) {
        // Update only the 'enabled' property
        data.enabled = enabled;

        // Write updated JSON back to the file
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        fileFound = true;
        return res.json({ success: true, message: "Egg updated", data });
      }
    }

    if (!fileFound) {
      return res.status(404).json({ error: "Egg with this ID not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error updating egg" });
  }
});

export default router;
