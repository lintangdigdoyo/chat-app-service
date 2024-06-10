import express from "express"

import Routes from "./routes"
import errorHandler from "./middlewares/error-handler"

const app = express()

app.use(express.json())

Routes.configure(app)

app.use(errorHandler)

export default app
