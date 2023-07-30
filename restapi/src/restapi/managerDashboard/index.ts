import express from 'express';

import {
  UserAuthMiddleware,
} from '../middlewares/auth';

import filterProducts from './filterProducts';
import loginManager from './loginManager';

const router = express.Router();

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Login manager
 *     description: Send the data to login as manager into the app
 *     tags:
 *       - managers
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
 *                 example: admin@magiclog.com
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
router.post('/login', loginManager);

/**
 * @swagger
 * /admin/products:
 *   get:
 *     summary: Get the products list
 *     description: List and filter the products registered
 *     security:
 *       - ManagerAuth: []
 *     parameters:
 *       - in: path
 *         seller:
 *         schema:
 *           type: string
 *         required: false
 *         description: The products have to match with the seller
 *     tags:
 *       - managers
 *     responses:
 *       200:
 *         description: The filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/UserProduct'
 *                       description: The list of the filtered products
 *       5XX:
 *         description: An error occured in the restapi
 */
router.get('/products', UserAuthMiddleware, filterProducts);

export default router;
