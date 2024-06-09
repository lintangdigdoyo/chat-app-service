import express from "express"

import Routes from "./routes"

const app = express()

app.use(express.json())

Routes.configure(app)

export default app
