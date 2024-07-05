import { StatusCodes } from "http-status-codes"

class ErrorException extends Error {
  status: number
  errors?: Record<string, string>
  success: boolean

  constructor(
    message = "Bad Request",
    code = StatusCodes.BAD_REQUEST,
    errors?: Record<string, string>,
  ) {
    super(message)
    this.status = code
    this.errors = errors
    this.success = false
  }
}

export default ErrorException
