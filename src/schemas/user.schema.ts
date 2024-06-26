import joi from "joi"

export const userSchema = joi.object({
  name: joi.string().required(),
  username: joi.string().min(4).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
})

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
})
