import { Router } from 'express';
import blacklistRoute from './blacklistRoute';

const router = Router();
router.use(blacklistRoute);

export default router;
