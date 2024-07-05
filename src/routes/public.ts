import express from "express"

import PublicController from "@/controllers/public.controller"

const router = express.Router()

router.get("/", PublicController.main)

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Check service connection
 *     description: Check service connection
 *     responses:
 *       200:
 *         description: Return PONG
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: PONG
 *
 */
router.get("/ping", PublicController.ping)

export default router
