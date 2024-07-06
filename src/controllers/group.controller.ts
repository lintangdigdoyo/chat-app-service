import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import ErrorException from "@/exceptions/ErrorException"
import GroupService from "@/services/group.service"

export default class GroupController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body
      const userId = req.user?.id

      if (!userId) {
        throw new ErrorException("Unauthorized", StatusCodes.UNAUTHORIZED)
      }

      const { message, group } = await GroupService.create(name, userId)

      res.status(StatusCodes.CREATED).json({
        message,
        data: { id: group.id, name: group.name },
      })
    } catch (err) {
      next(err)
    }
  }
}
