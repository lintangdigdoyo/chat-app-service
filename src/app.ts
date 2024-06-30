import express from "express"
import cookieParser from "cookie-parser"

import Routes from "./routes"
import errorHandler from "./middlewares/error-handler"
import { setupSwagger } from "./config/swagger"
import { env } from "./config/env"

const app = express()

app.use(express.json())
app.use(cookieParser())

Routes.configure(app)

const swaggerEnvs = ["development", "staging"]
if (swaggerEnvs.includes(env.APP_ENV)) {
  setupSwagger(app)
}

app.use(errorHandler)

export default app
