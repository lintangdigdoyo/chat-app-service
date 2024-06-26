import { ErrorRequestHandler } from "express"

import ErrorException from "@/exceptions/ErrorException"

const errorHandler: ErrorRequestHandler = (err: ErrorException, _req, res, _next) => {
  if (err.name === Error.name) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    })
  }

  console.error(err)

  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
  })
}

export default errorHandler
