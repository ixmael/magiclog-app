import express from 'express';

import {
  UserAuthMiddleware,
} from '../middlewares/auth';

import addProduct from './addProduct';
import getMyProducts from './getMyProducts';

const router = express.Router();

router.use(UserAuthMiddleware);

/**
 * @swagger
 * /dashboard/products:
 *   get:
 *     summary: List my products
 *     description: List all the products registered by me as an user
 *     security:
 *       - UserAuth: []
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: The list of my products
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
 *                         $ref: '#/components/schemas/Product'
 *                       description: The list of the filtered products
 *       5XX:
 *         description: An error occured in the restapi
 */
router.get('/products', getMyProducts);

/**
 * @swagger
 * /dashboard/products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to my list of products
 *     security:
 *       - UserAuth: []
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
 *                 example: admin@magiclog.com
 *               password:
 *                 required: true
 *                 type: string
 *                 example: ThisIsAPassword
 *     responses:
 *       201:
 *         description: The product was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The product was created
 *                 payload:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/UserProduct'
 *                       description: My list of the products
 *       404:
 *         description: You are not authorized
 *       5XX:
 *         description: An error occured during the fetching the products list
 */
router.post('/products', addProduct);

export default router;
