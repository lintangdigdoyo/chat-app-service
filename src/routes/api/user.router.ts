import express from "express"

import UserController from "@/controllers/user.controller"
import validate from "@/middlewares/validate"
import { userSchema, loginSchema } from "@/schemas/user.schema"
import auth from "@/middlewares/auth"

const router = express.Router()

/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: Message status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: success status
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: create user message status
 *                   example: User created successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *
 */
router.post("/", validate(userSchema), UserController.create)

/**
 * @swagger
 * /v1/users/login:
 *   post:
 *     summary: Authentication user
 *     description:  Authentication user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginRequest'
 *     responses:
 *       200:
 *         description: Return access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: success status
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: access token
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *
 */
router.post("/login", validate(loginSchema), UserController.login)

/**
 * @swagger
 * /v1/users/logout:
 *   post:
 *     summary: Logout user
 *     description:  Logout user
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Message status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: success status
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: logout message status
 *                   example: Logged out successfully
 *
 */
router.post("/logout", UserController.logout)

/**
 * @swagger
 * /v1/users/refresh:
 *   post:
 *     summary: Get a new refresh token
 *     description:  Get a new refresh token
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Return access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: success status
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: access token
 *
 */
router.post("/refresh", UserController.refresh)

/**
 * @swagger
 * /v1/users/friends/{id}:
 *   post:
 *     summary: Make a friend request
 *     description: Make a friend request to another user
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: friend's user id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: success status
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: add friend message status
 *                   example: Friend request added successfully
 *
 */
router.post("/friends/:id", auth, UserController.addFriend)

/**
 * @swagger
 * /v1/users/accept/{friendId}:
 *   post:
 *     summary: Accept a friend request
 *     description: Accept a friend request
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: friendId
 *         in: path
 *         required: true
 *         description: friend's user id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: success status
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: friend requets message status
 *                   example: Friend request accepted
 *
 */
router.post("/accept/:friendId", auth, UserController.acceptFriend)

export default router
