import express from "express"
import cookieParser from "cookie-parser"

import Routes from "./routes"
import errorHandler from "./middlewares/error-handler"

const app = express()

app.use(express.json())
app.use(cookieParser())

Routes.configure(app)

app.use(errorHandler)

export default app
