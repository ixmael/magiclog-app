import express from 'express';

import createAnUser from './createAnUser';
import loginAnUser from './loginAnUser';

const router = express.Router();

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     description: Send the data to login into the app
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 required: true
 *                 type: string
 *                 example: email@magiclog.com
 *               password:
 *                 required: true
 *                 type: string
 *                 example: ThisIsAPassword
 *     responses:
 *       200:
 *         description: The user was logged
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: The token to login in the request
 *                       example: eyJhbGc...RWhn7YP4e7Y
 *       404:
 *         description: The user failed on login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The password is invalid
 *       5XX:
 *         description: An error occured during the user authentication
 */
router.post('/login', loginAnUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     description: Send the data to create a new user
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 required: true
 *                 type: string
 *                 example: email@magiclog.com
 *               password:
 *                 required: true
 *                 type: string
 *                 example: ThisIsAPassword
 *               passwordToMatch:
 *                 required: true
 *                 type: string
 *                 example: ThisIsAPassword
 *     responses:
 *       201:
 *         description: The user was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The user with the email 'email@magiclog.com' was created
 *       400:
 *         description: The request data is empty, the email was registered or the password not match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The json data is not valid
 *       5XX:
 *         description: An error occured during the creation of the new user
 */
router.post('/', createAnUser);

export default router;
