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
  .then(() => {
    console.log("\x1b[36m%s\x1b[0m", "📦 Database:");
    console.log("\x1b[36m%s\x1b[0m", "━━━━━━━━━━━");
    console.log("\x1b[32m%s\x1b[0m", "✓ SQLite initialized successfully");
    console.log("\x1b[32m%s\x1b[0m", "✓ Connection established\n");
    /*(async () => {
      await db.sync({ alter: true }); // Ensure tables are created
      
    })();*/
  })
  .catch((err) => console.error("Database connection error:", err));

(async () => {
  await sequelize.sync({ alter: true });
  console.log("\x1b[32m%s\x1b[0m", "✓ Database synced\n");
})();

export default sequelize;
