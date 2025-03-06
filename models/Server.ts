import { DataTypes, Model } from "sequelize";
import db from "./db.ts";
import fs from "node:fs";
import toml from "toml";

const config = toml.parse(fs.readFileSync(process.cwd() + "/config.toml", "utf-8"));

interface ServerAttributes {
    id: string;
    lastRenewal: Date;
    nextRenewal: Date;
}

interface ServerCreationAttributes extends Partial<Pick<ServerAttributes, "lastRenewal" | "nextRenewal">> {
    id: string;
}

class Server extends Model<ServerAttributes, ServerCreationAttributes> implements ServerAttributes {
    public id!: string;
    public lastRenewal!: Date;
    public nextRenewal!: Date;

    public static async renewServer(serverId: string): Promise<void> {
        const server = await Server.findByPk(serverId);
        if (!server) {
            throw new Error("Server not found");
        }

        const now = new Date();
        server.lastRenewal = now;
        server.nextRenewal = new Date(now.getTime() + config.renewal.period * 24 * 60 * 60 * 1000); // Assuming period is in days
        await server.save();
    }
}

Server.init(
    {
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
            defaultValue: () => new Date(Date.now() + config.renewal.period * 24 * 60 * 60 * 1000), // Assuming period is in days
        },
    },
    {
        sequelize: db,
        modelName: "server",
    }
);

export default Server;