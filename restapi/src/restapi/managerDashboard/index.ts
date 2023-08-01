import express from 'express';

import {
  UserAuthMiddleware,
} from '../middlewares/auth';

import filterProducts from './filterProducts';
import loginManager from './loginManager';

const router = express.Router();

router.post('/login', loginManager);

router.get('/products', UserAuthMiddleware, filterProducts);

export default router;
