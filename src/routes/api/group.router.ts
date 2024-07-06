import express from "express"

import GroupController from "@/controllers/group.controller"
import auth from "@/middlewares/auth"

const router = express.Router()

router.post("/", auth, GroupController.create)
