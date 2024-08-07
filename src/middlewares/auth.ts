import { Request, RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"

import { env } from "@/config/env"
import { UserAccessTokenData } from "@/types/user.type"

const auth: RequestHandler = (req: Request, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(" ")[1]

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    })
  }

  jwt.verify(token, env.JWT_AUTH_TOKEN, (err, user) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      })
    }

    req.user = user as UserAccessTokenData
    next()
  })
}

export default auth
