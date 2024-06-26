import { StatusCodes } from "http-status-codes"

class ErrorException extends Error {
  status: number

  constructor(message = "Bad Request", code = StatusCodes.BAD_REQUEST) {
    super(message)
    this.status = code
  }
}

export default ErrorException
