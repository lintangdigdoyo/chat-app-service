import { User } from "@prisma/client"
import bcrypt from "bcrypt"

import { prismaClient } from "@/config/database"
import { ErrorException } from "@/exceptions"
import { StatusCodes } from "http-status-codes"

export const create = async (data: User) => {
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

  return newUser
}

export const getByUsername = async (username: string) => {
  const user = await prismaClient.user.findUnique({ where: { username } })

  if (!user) {
    throw new ErrorException("User not found")
  }

  return user
}

export const login = async (
  data: Omit<User, "id" | "username" | "name" | "created_at" | "updated_at">,
) => {
  const user = await prismaClient.user.findUnique({ where: { email: data.email } })

  if (!user) {
    throw new ErrorException("Incorrect password or email")
  }

  const isMatch = await bcrypt.compare(data.password, user.password)

  if (!isMatch) {
    throw new ErrorException("Incorrect password or email", StatusCodes.UNAUTHORIZED)
  }

  return user
}
