import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Comment from "./comments.js";
import User from "./user.js"; // Assuming you have a User model

const Like = sequelize.define(
  "Like",
  {
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Comment,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Reference the User model
        key: "id",
      },
    },
  },
  { timestamps: true }
);

// Relationships
Like.belongsTo(Comment, { foreignKey: "commentId" });
Like.belongsTo(User, { foreignKey: "userId" }); // Set up relationship with User

export default Like;
