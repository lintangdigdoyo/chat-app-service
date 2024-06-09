import express from "express"

import * as publicController from "@/controllers/public-controllers"

const router = express.Router()

router.get("/", publicController.main)
router.get("/ping", publicController.ping)

export default router
