import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Comment from "./comments.js";
import User from "./user.js";

const Reply = sequelize.define(
  "Reply",
  {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true }
);

// A reply belongs to a user and references the parent comment
Reply.belongsTo(User, { foreignKey: "userId" });
Reply.belongsTo(Comment, { foreignKey: "parentCommentId" });

export default Reply;
