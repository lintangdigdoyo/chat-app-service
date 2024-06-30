import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { env } from "@/config/config"

export default class PublicController {
  static async main(_req: Request, res: Response) {
    return res.status(StatusCodes.OK).json({
      service: env.APP_NAME,
      version: env.APP_VERSION,
    })
  }

  static async ping(_req: Request, res: Response) {
    return res.status(StatusCodes.OK).send("PONG")
  }
}
