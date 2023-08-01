import express from 'express';

import userRoutes from './user';
import dashboardRoutes from './dashboard';
import clientsRoutes from './market';
import managerDashboardRoutes from './managerDashboard';

// Prepare the router
const router = express.Router();

// Users endpoints
router.use('/users', userRoutes);

// Managers endpoints
router.use('/admin', managerDashboardRoutes);

// Products endpoints
router.use('/dashboard', dashboardRoutes);

// Clients endpoints
router.use('/', clientsRoutes);

export default router;
