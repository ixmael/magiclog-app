import express from 'express';

import userRoutes from './user';
import dashboardRoutes from './dashboard';
import clientsRoutes from './market';

// Prepare the router
const router = express.Router();

// Products endpoints
router.use('/dashboard', dashboardRoutes);

// Users endpoints
router.use('/users', userRoutes);

// Clients endpoints
router.use('/', clientsRoutes);

export default router;
