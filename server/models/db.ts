import { syncBuiltinESMExports } from "module";
import { Sequelize } from "sequelize";
//import "./accounts.ts"
//import "./settings.ts"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data.sqlite",
  logging: false,
});

async function sync() {
  await sequelize.sync({ alter: true, force: true });
  console.log("\x1b[32m Database sync successful \x1b[0m");
}

export default sequelize;
export {sync};