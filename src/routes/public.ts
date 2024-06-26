import express from "express"

import * as publicController from "@/controllers/public.controller"
import auth from "@/middlewares/auth"

const router = express.Router()

router.get("/", publicController.main)
router.get("/ping", auth, publicController.ping)

export default router
