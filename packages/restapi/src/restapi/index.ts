import express from 'express';

import userRoutes from './user';
import dashboardRoutes from './dashboard';

// Prepare the router
const router = express.Router();

// Products endpoints
router.use('/dashboard', dashboardRoutes);

// Users endpoints
router.use('/users', userRoutes);

export default router;
