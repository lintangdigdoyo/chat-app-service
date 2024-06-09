import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { env } from "@/config/config"

export const main = (_req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({
    service: env.APP_NAME,
    version: env.APP_VERSION,
  })
}

export const ping = (_req: Request, res: Response) => {
  return res.status(StatusCodes.OK).send("PONG")
}
