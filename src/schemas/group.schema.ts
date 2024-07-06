import joi from "joi"

export const groupSchema = joi.object({
  name: joi.string().required(),
})
