import { StatusCodes } from "http-status-codes"

export class ErrorException extends Error {
  status: number

  constructor(message = "Bad Request", code = StatusCodes.BAD_REQUEST) {
    super(message)
    this.status = code
  }
}
