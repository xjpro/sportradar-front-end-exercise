import db from "../services/db";
import { DataTypes } from "sequelize";

const Team = db.define(
  "Team",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

export default Team;
