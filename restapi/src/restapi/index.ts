import express from 'express';

import userRoutes from './user';
import dashboardRoutes from './dashboard';
import clientsRoutes from './market';
import managerDashboardRoutes from './managerDashboard';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *          email:
 *            type: string
 *            description: The email of the user
 *          password:
 *            type: string
 *            description: The password of the user
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - sku
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         sku:
 *           type: string
 *           description: The sku of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *       example:
 *         id: eb805c00-e244-4f7b-821a-d86b8ad8cf5a
 *         name: Product A
 *         sku: ABCD12345
 *         price: 200.5
 */

// Prepare the router
const router = express.Router();

// Users endpoints
router.use('/users', userRoutes);

// Managers endpoints
router.use('/admin', managerDashboardRoutes);

// Products endpoints
router.use('/dashboard', dashboardRoutes);

router.use('/', clientsRoutes);

export default router;
