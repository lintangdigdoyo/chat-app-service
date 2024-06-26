import express from "express"

import * as userController from "@/controllers/user.controller"
import validate from "@/middlewares/validate"
import { userSchema, loginSchema } from "@/schemas/user.schema"

const router = express.Router()

router.post("/", validate(userSchema), userController.create)
router.post("/login", validate(loginSchema), userController.login)
router.post("/logout", userController.logout)
router.post("/refresh", userController.refresh)

export default router
