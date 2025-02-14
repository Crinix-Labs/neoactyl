import { Router, Response, Request, NextFunction } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { storeService } from '../services/store.service';
import { CustomError } from '../middleware/errorHandler';
import { AuthRequest } from '../types';

const router = Router();

// Get all available store items
router.get('/', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await storeService.getAllItems();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// Purchase an item
router.post('/purchase/:itemId', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id;
    const itemId = parseInt(req.params.itemId);

    if (!userId) {
      throw new CustomError('User not authenticated', 401);
    }

    if (isNaN(itemId)) {
      throw new CustomError('Invalid item ID', 400);
    }

    const result = await storeService.purchaseItem(userId, itemId);
    res.json({
      message: 'Purchase successful',
      purchase: result
    });
  } catch (error) {
    next(error);
  }
});

export { router as storeRoutes };