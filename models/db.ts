import { Sequelize } from 'sequelize';
import toml from "toml";
import fs from "fs";

// load the config file
const config = toml.parse(fs.readFileSync("../config.toml", "utf-8"));

const isMySQL = config.database.type ? "mysql" : false;

const sequelize = new Sequelize({
  dialect: isMySQL ? 'mysql' : 'sqlite',
  storage: isMySQL ? undefined : './database.sqlite', // Path to your SQLite database file
  host: isMySQL ? config.database.mysql.host : undefined, // MySQL host
  username: isMySQL ? config.database.mysql.username : undefined, // MySQL username
  password: isMySQL ? config.database.mysql.password : undefined, // MySQL password
  database: isMySQL ? config.database.mysql.database : undefined, // MySQL database name
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
