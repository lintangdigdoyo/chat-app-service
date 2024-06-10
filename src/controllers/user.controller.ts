import { RequestHandler } from "express"

import * as userService from "@/services/user.service"
import { StatusCodes } from "http-status-codes"

export const create: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body

    const result = await userService.create(user)

    res.status(StatusCodes.CREATED).json({ data: result })
  } catch (err) {
    next(err)
  }
}
