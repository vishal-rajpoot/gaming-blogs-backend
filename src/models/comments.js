import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Blog from "./blogs.js";

const Comment = sequelize.define(
  "Comment",
  {
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    parentCommentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mentions: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);
Comment.belongsTo(Blog, { foreignKey: "blogId" });
Comment.hasMany(Comment, { as: "replies", foreignKey: "parentCommentId" });

export default Comment;
