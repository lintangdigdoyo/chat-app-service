import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { StatusCodes } from "http-status-codes"

import { prismaClient } from "@/config/database"
import ErrorException from "@/exceptions/ErrorException"
import { env } from "@/config/env"
import {
  generateAccessToken,
  generateRefreshToken,
  getBlacklistRefreshToken,
  getRefreshTokenExpiration,
  setBlacklistRefreshToken,
} from "./helpers"
import { LoginData, UserAccessTokenData } from "@/types/user.type"

export default class UserService {
  static async create(data: User) {
    const userExist = await prismaClient.user.findFirst({
      where: {
        OR: [
          {
            email: data.email,
          },
          {
            username: data.username,
          },
        ],
      },
    })

    if (userExist?.email === data.email) {
      throw new ErrorException("Email already exist")
    }
    if (userExist?.username === data.username) {
      throw new ErrorException("Username already exist")
    }

    data.password = await bcrypt.hash(data.password, 10)

    const newUser = await prismaClient.user.create({ data })

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      name: newUser.name,
    }
  }

  static async login(data: LoginData) {
    const user = await prismaClient.user.findUnique({
      where: { email: data.email },
      select: { id: true, name: true, email: true, username: true, password: true },
    })

    if (!user) {
      throw new ErrorException("Incorrect password or email")
    }

    const isMatch = await bcrypt.compare(data.password, user.password)

    if (!isMatch) {
      throw new ErrorException("Incorrect password or email")
    }

    const loggedinUser: Partial<User> = user

    if (!loggedinUser.username || !loggedinUser.name || !loggedinUser.email || !loggedinUser.id) {
      throw new ErrorException("User not found", StatusCodes.NOT_FOUND)
    }

    const userData = {
      id: loggedinUser.id,
      email: loggedinUser.email,
      username: loggedinUser.username,
      name: loggedinUser.name,
    }

    const accessToken = generateAccessToken(userData)
    const refreshToken = generateRefreshToken(userData)

    return { accessToken, refreshToken, user: userData }
  }

  static async logout(refreshToken: string) {
    try {
      const decodedToken = jwt.verify(refreshToken, env.JWT_REFRESH_TOKEN) as UserAccessTokenData &
        jwt.JwtPayload

      if (!decodedToken.iat || !decodedToken.exp) {
        throw new ErrorException()
      }

      const expiresIn = getRefreshTokenExpiration(decodedToken.iat, decodedToken.exp)

      const ok = await setBlacklistRefreshToken(refreshToken, expiresIn)

      if (!ok) {
        throw new ErrorException()
      }

      return { message: "Logged out successfully" }
    } catch (err) {
      throw new ErrorException()
    }
  }

  static async refresh(refreshToken: string) {
    const blacklistedRefreshToken = await getBlacklistRefreshToken(refreshToken)

    if (blacklistedRefreshToken) {
      throw new ErrorException("Unauthorized", StatusCodes.UNAUTHORIZED)
    }

    try {
      const decodedToken = jwt.verify(refreshToken, env.JWT_REFRESH_TOKEN) as UserAccessTokenData &
        jwt.JwtPayload

      const user = {
        id: decodedToken.id,
        email: decodedToken.email,
        username: decodedToken.username,
        name: decodedToken.name,
      }

      const newAccessToken = generateAccessToken(user)
      const newRefreshToken = generateRefreshToken(user)

      if (!decodedToken.iat || !decodedToken.exp) {
        throw new ErrorException()
      }

      const expiresIn = getRefreshTokenExpiration(decodedToken.iat, decodedToken.exp)
      const ok = await setBlacklistRefreshToken(refreshToken, expiresIn)

      if (!ok) {
        throw new ErrorException()
      }

      return { accessToken: newAccessToken, refreshToken: newRefreshToken }
    } catch (err) {
      throw new ErrorException("Unauthorized", StatusCodes.UNAUTHORIZED)
    }
  }

  static async addFriend(userId: string, friendId: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: friendId,
      },
    })

    if (!user) {
      throw new ErrorException("User not found", StatusCodes.NOT_FOUND)
    }

    const friend = await prismaClient.friend.findUnique({
      where: {
        user_id_friend_id: {
          user_id: userId,
          friend_id: friendId,
        },
      },
    })

    if (friend) {
      throw new ErrorException("User already added as a friend")
    }

    await prismaClient.friend.create({
      data: {
        friend_id: friendId,
        user_id: userId,
        accepted: false,
      },
    })

    return { message: "Friend added successfully" }
  }

  static async acceptFriend(userId: string, friendId: string) {
    const user = await prismaClient.friend.findUnique({
      where: {
        user_id_friend_id: {
          user_id: userId,
          friend_id: friendId,
        },
      },
    })

    if (!user) {
      throw new ErrorException("User not found", StatusCodes.NOT_FOUND)
    }

    if (user.accepted) {
      throw new ErrorException("Friend request already accepted", StatusCodes.BAD_REQUEST)
    }

    await prismaClient.$transaction([
      prismaClient.friend.update({
        where: {
          user_id_friend_id: {
            user_id: userId,
            friend_id: friendId,
          },
        },
        data: {
          accepted: true,
        },
      }),
      prismaClient.friend.upsert({
        where: {
          user_id_friend_id: {
            user_id: friendId,
            friend_id: userId,
          },
        },
        create: {
          user_id: friendId,
          friend_id: userId,
          accepted: true,
        },
        update: {
          accepted: true,
        },
      }),
    ])

    return { message: "Friend request accepted" }
  }
}
