import sequelize from "./db";
import { DataTypes, Model } from "sequelize";

// Define User attributes based on Pterodactyl’s database schema
interface UserAttributes {
  id: number;
  uuid: string;
  dcid: number;
  username: string;
  email: string;
}

// Define User model
class User extends Model<UserAttributes> {
  public id!: number;
  public uuid!: string;
  public dcid!: number;
  public username!: string;
  public email!: string;
}

// Initialize the model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    dcid: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  {
    sequelize,
    tableName: "users", // Matches Pterodactyl's users table
    timestamps: true, // Pterodactyl uses timestamps
  }
);

export default User;