import { Express } from "express"

import publicRoutes from "./public"

export default class Routes {
  public static configure(app: Express) {
    app.use("/", publicRoutes)
  }
}
