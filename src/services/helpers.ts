import jwt from "jsonwebtoken"

import { env } from "@/config/env"
import redis from "@/config/redis"
import { UserAccessTokenData } from "@/types/user.type"

export const getRefreshTokenExpiration = (iat: number, expirationTime: number) => {
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const expirationTimestamp = iat + expirationTime
  const timeLeft = expirationTimestamp - currentTimestamp
  return timeLeft
}

export const generateAccessToken = (user: UserAccessTokenData) => {
  return jwt.sign(user, env.JWT_AUTH_TOKEN, { expiresIn: "10m" })
}

export const generateRefreshToken = (user: UserAccessTokenData) => {
  return jwt.sign(user, env.JWT_REFRESH_TOKEN, {
    expiresIn: "7d",
  })
}

export const setBlacklistRefreshToken = async (token: string, expiresIn = 60) => {
  return await redis.setex(`refresh_token:${token}`, expiresIn, "true")
}

export const getBlacklistRefreshToken = async (token: string) => {
  return await redis.get(`refresh_token:${token}`)
}
