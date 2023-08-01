import express from 'express';

import createAnUser from './createAnUser';
import loginAnUser from './loginAnUser';

const router = express.Router();

router.post('/login', loginAnUser);

router.post('/', createAnUser);

export default router;
