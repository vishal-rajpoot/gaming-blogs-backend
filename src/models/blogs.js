import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./user.js";

const Blog = sequelize.define(
  "Blog",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

Blog.belongsTo(User, { foreignKey: "userId", as: "author" });

export default Blog;
