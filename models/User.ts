import { DataTypes } from "sequelize";
import sequelize from "./db.ts";
import toml from "toml";
import fs from "node:fs";

const config = toml.parse(fs.readFileSync("../config.toml", "utf-8"));

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
    defaultValue: config.resources.ram,
  },
  disk: {
    type: DataTypes.INTEGER,
    defaultValue: config.resources.disk,
  },
  cpu: {
    type: DataTypes.INTEGER,
    defaultValue: config.resources.cpu,
  },
  allocations: {
    type: DataTypes.INTEGER,
    defaultValue: config.resources.allocations,
  },
  databases: {
    type: DataTypes.INTEGER,
    defaultValue: config.resources.database,
  },
  backups: {
    type: DataTypes.INTEGER,
    defaultValue: config.resources.backup,
  },
  slots: {
    type: DataTypes.INTEGER,
    defaultValue: config.resources.slots,
  },
});

// Synchronize the model with the database
User.sync();

export default User;