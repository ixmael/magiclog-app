import express from 'express';

import userRoutes from './userHandlers';

// Prepare the router
const router = express.Router();

//
router.use('/users', userRoutes);

export default router;
