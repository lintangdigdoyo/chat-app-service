import { ErrorRequestHandler } from "express"

import ErrorException from "@/exceptions/ErrorException"

const errorHandler: ErrorRequestHandler = (err: ErrorException, _req, res, _next) => {
  if (err.name === Error.name) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    })
  }

  console.error(err)

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  })
}

export default errorHandler
