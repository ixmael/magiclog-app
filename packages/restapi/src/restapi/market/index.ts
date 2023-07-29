import express from 'express';

import filterProducts from './filterProducts';

const router = express.Router();

router.get('/products', filterProducts);

export default router;
