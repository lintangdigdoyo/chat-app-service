import express from "express"

import GroupController from "@/controllers/group.controller"
import auth from "@/middlewares/auth"
import { groupSchema } from "@/schemas/group.schema"
import validate from "@/middlewares/validate"

const router = express.Router()

/**
 * @swagger
 * /v1/groups:
 *   post:
 *     summary: Create group
 *     description: Create group
 *     tags:
 *       - Group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Created group
 *         content:
 *           application/json:
 *             schema:
 *               type: Object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: success status
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: create group message status
 *                   example: Group created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Group'
 *
 */
router.post("/", auth, validate(groupSchema), GroupController.create)

export default router
