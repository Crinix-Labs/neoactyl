import { Sequelize } from 'sequelize';
import { config } from './config';
import path from 'path';

// Configure SQLite database
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(process.cwd(), 'database.sqlite'),
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});