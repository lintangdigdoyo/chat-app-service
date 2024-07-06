import express from "express"
import cookieParser from "cookie-parser"

import Routes from "./routes"
import errorHandler from "./middlewares/error-handler"
import { setupSwagger } from "./config/swagger"
import { env } from "./config/env"
import responseFormatter from "./middlewares/response-formatter"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(responseFormatter)

Routes.configure(app)

app.use(errorHandler)

const swaggerEnvs = ["development", "staging"]
if (swaggerEnvs.includes(env.APP_ENV)) {
  setupSwagger(app)
}

export default app
