import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import { Schema } from "joi"

const validate =
  (schema: Schema): RequestHandler =>
  (req, res, next) => {
    const { error } = schema.validate(req.body)

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message })
    }
    next()
  }

export default validate
