import { ErrorException } from "@/exceptions"
import { PrismaClientValidationError } from "@prisma/client/runtime/library"
import { ErrorRequestHandler } from "express"

const errorHandler: ErrorRequestHandler = (err: ErrorException, _req, res, _next) => {
  if (err.name === PrismaClientValidationError.name) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    })
  }

  res.status(err.status).json({
    status: err.status,
    message: err.message,
  })
}

export default errorHandler
