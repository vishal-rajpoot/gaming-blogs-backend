import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
import { InternalServerError } from "../utils/appErrors.js";
import appConfig from "./appConfig.js";

dotenv.config();

const sequelize = new Sequelize(
  appConfig.db.database,
  appConfig.db.username,
  appConfig.db.password,
  {
    host: appConfig.db.host,
    dialect: appConfig.db.dialect,
    logging: appConfig.db.logging,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database Connection has been established successfully.");

    // Sync all models that are not already in the database
    await sequelize.sync({ force: false }); // Use { force: true } if you want to drop and recreate tables every time/ this will update and delete existing data to empty tables

    logger.info("All models were synchronized successfully.");
  } catch (error) {
    console.log(error);
    logger.error("Database connection failed");
    return new InternalServerError(
      "Database connection failed. Please check the logs for details."
    );
  }
};

export { sequelize, connectDB };
