import joi from "joi"

const userSchema = joi.object({
  name: joi.string().required(),
  username: joi.string().min(4).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
})

export default userSchema
