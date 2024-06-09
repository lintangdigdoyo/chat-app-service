import dotenv from "dotenv"

dotenv.config()

export const env = {
  ROOT_DIR: process.env.ROOT_DIR,
  APP_NAME: process.env.APP_NAME,
  APP_VERSION: process.env.APP_VERSION,
  APP_PORT: process.env.APP_PORT || 8080,
  APP_ENV: process.env.APP_ENV || "local",

  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
}
