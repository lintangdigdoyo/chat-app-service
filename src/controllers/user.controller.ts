import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import UserService from "@/services/user.service"
import ErrorException from "@/exceptions/ErrorException"

export default class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body

      const userData = await UserService.create(user)

      res.status(StatusCodes.CREATED).json({ message: "User created successfully", data: userData })
    } catch (err) {
      next(err)
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userAuthData = req.body

      const { accessToken, refreshToken, user } = await UserService.login(userAuthData)

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      res.status(StatusCodes.OK).json({
        data: {
          accessToken,
          user,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.refresh_token
      if (!token) {
        throw new ErrorException("Unauthorized", StatusCodes.UNAUTHORIZED)
      }

      const { accessToken, refreshToken } = await UserService.refresh(token)

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      res.status(StatusCodes.OK).json({ data: { accessToken } })
    } catch (err) {
      next(err)
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refresh_token

      if (!refreshToken) {
        throw new ErrorException("Unauthorized", StatusCodes.UNAUTHORIZED)
      }

      const { message } = await UserService.logout(refreshToken)

      res.status(StatusCodes.OK).json({ message })
    } catch (err) {
      next(err)
    }
  }

  static async addFriend(req: Request, res: Response, next: NextFunction) {
    try {
      const friendId = req.params.id
      const userId = req.user?.id

      if (!friendId) {
        throw new ErrorException()
      }

      if (friendId === userId) {
        throw new ErrorException("Cannot add user with the same id")
      }

      if (!userId) {
        throw new ErrorException("Unauthorized", StatusCodes.UNAUTHORIZED)
      }

      const { message } = await UserService.addFriend(userId, friendId)

      res.status(StatusCodes.OK).json({ message })
    } catch (err) {
      next(err)
    }
  }

  static async acceptFriend(req: Request, res: Response, next: NextFunction) {
    try {
      const friendId = req.params.friendId
      const userId = req.user?.id

      if (!friendId) {
        throw new ErrorException()
      }

      if (friendId === userId) {
        throw new ErrorException()
      }

      if (!userId) {
        throw new ErrorException("Unauthorized", StatusCodes.UNAUTHORIZED)
      }

      const { message } = await UserService.acceptFriend(userId, friendId)

      res.status(StatusCodes.OK).json({ message })
    } catch (err) {
      next(err)
    }
  }
}
