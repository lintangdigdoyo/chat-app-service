import dotenv from "dotenv"

dotenv.config()

export const env = {
  ROOT_DIR: process.env.ROOT_DIR,
  APP_NAME: process.env.APP_NAME,
  APP_VERSION: process.env.APP_VERSION,
  APP_PORT: process.env.APP_PORT || 8080,
  APP_URL: process.env.APP_PORT || "http://localhost:8080",
  APP_ENV: process.env.APP_ENV || "local",
  JWT_AUTH_TOKEN: process.env.JWT_AUTH_TOKEN || "secret",
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN || "secret",
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: process.env.REDIS_PORT || 6379,

  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
}
