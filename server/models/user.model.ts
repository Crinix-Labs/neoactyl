import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface UserAttributes {
  id?: number; // Made optional since it's auto-generated
  username: string;
  email: string;
  password: string;
  coins: number;
  isAdmin: boolean;
  lastAfkReward?: Date;
  createdAt?: Date; // Optional since it has a default value
  resetToken?: string;
  resetTokenExpiry?: Date;
  lastLogin?: Date;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public coins!: number;
  public isAdmin!: boolean;
  public lastAfkReward?: Date;
  public readonly createdAt!: Date;
  public resetToken?: string;
  public resetTokenExpiry?: Date;
  public lastLogin?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    coins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lastAfkReward: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    resetToken: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);