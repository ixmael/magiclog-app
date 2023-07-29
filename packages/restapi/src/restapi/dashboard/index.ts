import express from 'express';

import { UserAuthMiddleware } from '../middlewares/auth';

import addProduct from './addProduct';
import getMyProducts from './getMyProducts';

const router = express.Router();

router.use(UserAuthMiddleware);

router.get('/products', getMyProducts);
router.post('/products', addProduct);

export default router;
