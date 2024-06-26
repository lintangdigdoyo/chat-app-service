import { Request, RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"

import { env } from "@/config/config"
import { UserAccessTokenData } from "@/types/user.type"

const auth: RequestHandler = (req: Request, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(" ")[1]

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      message: "Unauthorized",
    })
  }

  jwt.verify(token, env.JWT_AUTH_TOKEN, (err, user) => {
    if (err) {
      return res.status(StatusCodes.FORBIDDEN).json({
        status: StatusCodes.FORBIDDEN,
        message: "Forbidden",
      })
    }

    req.user = user as UserAccessTokenData
    next()
  })
}

export default auth
