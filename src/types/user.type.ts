import { User } from "@prisma/client"

export type LoginData = Omit<User, "id" | "username" | "name" | "created_at" | "updated_at">

export type UserAccessTokenData = Omit<User, "password" | "created_at" | "updated_at">
