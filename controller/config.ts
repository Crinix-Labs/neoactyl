import fs from "fs";
import path from "path";
import toml from "toml";

// Load and parse the TOML configuration file
const config = toml.parse(
  fs.readFileSync(path.join(process.cwd(), "/config.toml"), "utf-8")
);

// Export configuration
export default config;
