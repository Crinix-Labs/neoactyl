import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data.sqlite",
  logging: false,
});

(async () => {
  await sequelize.sync({ alter: true });
  console.log("\x1b[32m Database sync successful \x1b[0m");
})();

export default sequelize;
