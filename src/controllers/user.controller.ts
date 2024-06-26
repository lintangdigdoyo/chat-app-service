import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"

import * as userService from "@/services/user.service"
import ErrorException from "@/exceptions/ErrorException"

export const create: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body

    const result = await userService.create(user)

    res.status(StatusCodes.CREATED).json({ data: result })
  } catch (err) {
    next(err)
  }
}

export const login: RequestHandler = async (req, res, next) => {
  try {
    const userAuthData = req.body

    const { accessToken, refreshToken } = await userService.login(userAuthData)

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(StatusCodes.OK).json({ accessToken })
  } catch (err) {
    next(err)
  }
}

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies?.refresh_token
    if (!token) {
      throw new ErrorException("Unauthorized", StatusCodes.UNAUTHORIZED)
    }

    const { accessToken, refreshToken } = await userService.refresh(token)

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(StatusCodes.OK).json({ accessToken })
  } catch (err) {
    next(err)
  }
}

export const logout: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]
    const refreshToken = req.cookies?.refresh_token

    if (!token || !refreshToken) {
      throw new ErrorException("Unauthorized", StatusCodes.UNAUTHORIZED)
    }

    const { message } = await userService.logout(token, refreshToken)

    res.status(StatusCodes.OK).json({ message })
  } catch (err) {
    next(err)
  }
}
