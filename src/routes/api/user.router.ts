import express from "express"

import * as userController from "@/controllers/user.controller"
import validate from "@/middlewares/validate"
import userSchema from "@/schemas/user.schema"

const router = express.Router()

router.post("/", validate(userSchema), userController.create)

export default router
