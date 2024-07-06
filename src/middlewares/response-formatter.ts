import { RequestHandler } from "express"

export interface ResponseFormat {
  success?: boolean
  message?: string
  data?: unknown
  meta?: unknown
}

const responseFormatter: RequestHandler = (_req, res, next) => {
  const originalJson = res.json

  res.json = function (data: ResponseFormat) {
    const formattedResponse = {
      ...data,
      success: data.success ?? true,
      message: data.message,
      data: data.data,
      meta: data.meta,
    }
    return originalJson.call(this, formattedResponse)
  }

  next()
}

export default responseFormatter
