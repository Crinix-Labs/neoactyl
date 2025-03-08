import fs from "node:fs";
import toml from "toml";
import axios from "axios";
import path from "path";

const config = toml.parse(
  fs.readFileSync(process.cwd() + "/config.toml", "utf-8")
);

async function fetchNodes() {
  // Ensure the nodes directory exists
  const nodesDir = path.join(process.cwd(), "nodes"); // Changed "node" to "nodes"
  if (!fs.existsSync(nodesDir)) {
    fs.mkdirSync(nodesDir);
  }

  try {
    const nodesRes = await axios.get(
      `${config.pterodactyl.panel}/api/application/nodes`,
      {
        headers: {
          Authorization: `Bearer ${config.pterodactyl.api}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const nodes = nodesRes.data.data;

    nodes.forEach((node) => {
      const attributes = node.attributes;

      // Remove unwanted properties
      [
        "fqdn",
        "scheme",
        "behind_proxy",
        "memory_overallocate",
        "disk_overallocate",
        "upload_size",
        "daemon_listen",
        "daemon_sftp",
        "created_at",
        "updated_at",
        "allocated_resources",
      ].forEach((prop) => delete attributes[prop]);

      attributes.enabled = true; // Move inside the loop

      const nodeFilePath = path.join(
        nodesDir,
        `${attributes.name.replace(/\s+/g, "_")}.json`
      );

      // Check if the node file already exists
      if (!fs.existsSync(nodeFilePath)) {
        fs.writeFileSync(nodeFilePath, JSON.stringify(attributes, null, 4));
        console.log(`Node ${attributes.name} has been saved!`);
      } else {
        console.log(`Node ${attributes.name} already exists, skipping...`);
      }
    });
  } catch (error) {
    console.error(`Error fetching node:`, error.message);
  }
}

export default fetchNodes;
