import { DataTypes } from "sequelize";
import db from "./db.ts";
import fs from "node:fs";
import toml from "toml";

const config = toml.parse(fs.readFileSync(process.cwd() + "/config.toml", "utf-8"));

interface Server {
    id: string | number;
    lastRenewal: Date;
    nextRenewal: Date;
}

const ServerModel = db.define("server", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    lastRenewal: {
        type: DataTypes.DATE,
        allowNull: !config.renewal.enabled,
    },
    nextRenewal: {
        type: DataTypes.DATE,
        allowNull: !config.renewal.enabled,
        defaultValue: new Date(Date.now() + config.renewal.period),
    },
});

export default ServerModel;