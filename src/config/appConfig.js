import dotenv from "dotenv";

dotenv.config();

export default {
  app: {
    port: process.env.PORT || 8088,
    appName: process.env.APP_NAME || "gaming-blogs-api",
    env: process.env.NODE_ENV || "dev",
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || "blog_website",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "12345",
    logging: process.env.DB_LOGGING || false,
    dialect: process.env.DB_DIALECT || "mysql",
    connectTimeout: process.env.DB_CONN_TIME_OUT || 60000,
  },
  winiston: {
    logpath: "./logs/",
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET || "loiuytrewq",
    jwt_expiresin: process.env.JWT_EXPIRES_IN || "1h",
    saltRounds: Number(process.env.SALT_ROUND) || 10,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || "2h",
    temp_token: process.env.TEMP_TOKEN,
    temp_token_expires: process.env.TEMP_TOKEN_EXPIRES_IN || "5m",
  },
};
