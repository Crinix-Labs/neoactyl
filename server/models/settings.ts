import { DataTypes, Model } from "sequelize";
import sequelize from "./db.ts";

interface SettingsAttributes {
    setting: string;
    value: string;
}

class Settings extends Model<SettingsAttributes>{
    setting!: string;
    value!: string;
}

Settings.init(
    {
    setting: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    tableName: "settings",
    timestamps: true,
}
)

export default Settings;