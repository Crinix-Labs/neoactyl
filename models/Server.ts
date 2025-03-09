import { DataTypes } from "sequelize";
import db from "./db.ts";
import fs from "node:fs";
import toml from "toml";

const config = toml.parse(
  fs.readFileSync(process.cwd() + "/config.toml", "utf-8")
);

const Server = db.define("server", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  lastRenewal: {
    type: DataTypes.DATE,
    allowNull: !config.renewal.enabled,
  },
});

export default Server;
