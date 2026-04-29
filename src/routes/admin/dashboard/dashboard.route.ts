import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import * as dashboardController from '../../../controllers/admin/dashboard/dashboard.controller';

const router: Router = Router();

router.get('/', authMiddleware.isAuthorized, dashboardController.getDashboardSummary);
router.get('/summary', authMiddleware.isAuthorized, dashboardController.getDashboardSummary);

export const dashboardRoute: Router = router;
