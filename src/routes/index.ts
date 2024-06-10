import { Express } from "express"

import publicRoutes from "./public"
import apiRoutes from "./api"

export default class Routes {
  public static configure(app: Express) {
    app.use("/", publicRoutes)
    app.use("/v1", apiRoutes)
  }
}
