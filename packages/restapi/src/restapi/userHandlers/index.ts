import express from 'express';

import createAnUser from './createAnUser';

const router = express.Router();

router.post('/', createAnUser);

export default router;
