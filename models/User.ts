import { DataTypes } from "sequelize";
import sequelize from "./db.ts";
import toml from "toml";
import fs from "node:fs";

const config = toml.parse(
  fs.readFileSync(process.cwd() + "/config.toml", "utf-8")
);

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coins: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  ram: {
    type: DataTypes.INTEGER,
    defaultValue: config.Resources.ram,
  },
  disk: {
    type: DataTypes.INTEGER,
    defaultValue: config.Resources.disk,
  },
  cpu: {
    type: DataTypes.INTEGER,
    defaultValue: config.Resources.cpu,
  },
  allocations: {
    type: DataTypes.INTEGER,
    defaultValue: config.Resources.allocations,
  },
  databases: {
    type: DataTypes.INTEGER,
    defaultValue: config.Resources.database,
  },
  backups: {
    type: DataTypes.INTEGER,
    defaultValue: config.Resources.backup,
  },
  slots: {
    type: DataTypes.INTEGER,
    defaultValue: config.Resources.slots,
  },
  servers: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  googleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

// Synchronize the model with the database
User.sync();

export default User;
