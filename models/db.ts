import { Sequelize } from "sequelize";
import toml from "toml";
import fs from "fs";
import path from "path";

// Load the config file
const config = toml.parse(
  fs.readFileSync(process.cwd() + "/config.toml", "utf-8")
);

const isMySQL = config.database.type === "mysql";

const sequelize = new Sequelize(
  isMySQL ? config.database.mysql.database : undefined,
  isMySQL ? config.database.mysql.username : undefined,
  isMySQL ? config.database.mysql.password : undefined,
  {
    dialect: isMySQL ? "mysql" : "sqlite",
    host: isMySQL ? config.database.mysql.host : undefined,
    storage: isMySQL
      ? undefined
      : path.join(process.cwd(), config.database.filename),
    logging: false, // Disable SQL logging
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.error("Database connection error:", err));

export default sequelize;
