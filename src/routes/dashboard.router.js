import {Router} from 'express';
import {dashboardView} from '../controllers/dashboard.controller';

const router = Router();

router.get('/dashboard', dashboardView);

export default router;