import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
import { InternalServerError } from "../utils/appErrors.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database Connection has been established successfully.");
  } catch (error) {
    // console.log(error);
    logger.error("Database connection failed");
    return new InternalServerError(
      "Database connection failed. Please check the logs for details."
    );
  }
};

export { sequelize, connectDB };
