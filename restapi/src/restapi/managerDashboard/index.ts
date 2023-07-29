import express from 'express';

/*
import {
  UserAuthMiddleware,
} from '../middlewares/auth';
*/

import filterProducts from './filterProducts';

const router = express.Router();

// router.use(UserAuthMiddleware);

router.get('/', filterProducts);

export default router;
