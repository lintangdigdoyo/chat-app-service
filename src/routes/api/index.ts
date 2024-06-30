import express from "express"

import userRouter from "./user.router"

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           readOnly: true
 *           description: id of the user
 *           example: b56ee8a8-b842-4c2f-8e59-86bd0ee9ef3c
 *         name:
 *           type: string
 *           description: name of the user
 *           example: John Doe
 *         username:
 *           type: string
 *           description: username of the user
 *           example: john_doe
 *         email:
 *           type: string
 *           description: email of the user
 *           example: john@mail.com
 *         password:
 *           type: string
 *           writeOnly: true
 *           description: password of the user
 *           example: passw0rd
 *     CreateUserRequest:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *         - type: object
 *           required:
 *             - name
 *             - username
 *             - email
 *             - password
 *     UserLoginRequest:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *         - type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             username:
 *               readOnly: true
 *             name:
 *               readOnly: true
 *
 */
router.use("/users", userRouter)

export default router
