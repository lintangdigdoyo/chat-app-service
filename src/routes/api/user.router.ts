import express from "express"

import UserController from "@/controllers/user.controller"
import validate from "@/middlewares/validate"
import { userSchema, loginSchema } from "@/schemas/user.schema"

const router = express.Router()

router.post("/", validate(userSchema), UserController.create)
router.post("/login", validate(loginSchema), UserController.login)
router.post("/logout", UserController.logout)
router.post("/refresh", UserController.refresh)

export default router
