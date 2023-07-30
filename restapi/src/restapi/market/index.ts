import express from 'express';

import filterProducts from './filterProducts';

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get the products list
 *     description: List and filter the products registered
 *     parameters:
 *       - in: path
 *         name: sku
 *         schema:
 *           type: string
 *         required: false
 *         description: The products have to match with the sku
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The products have to match with the name
 *       - in: path
 *         name: minPrice
 *         schema:
 *           type: number
 *         required: false
 *         description: The products have cost more or equal to minPrice
 *       - in: path
 *         name: maxPrice
 *         schema:
 *           type: number
 *         required: false
 *         description: The products have cost less or equal to maxPrice
 *     tags:
 *       - clients
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
 *                         $ref: '#/components/schemas/PublicProduct'
 *                       description: The list of the filtered products
 *       5XX:
 *         description: An error occured in the restapi
 */
router.get('/products', filterProducts);

export default router;
