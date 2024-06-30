import { User } from "@prisma/client"

export type LoginData = Pick<User, "email" | "password">

export type UserAccessTokenData = Omit<User, "password" | "created_at" | "updated_at">
