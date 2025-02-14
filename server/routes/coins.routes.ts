import { Router, Response, Request, NextFunction } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { coinService } from '../services/coin.service';
import { CustomError } from '../middleware/errorHandler';
import { AuthRequest } from '../types';

const router = Router();

// Get user's coin balance
router.get('/balance', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id;
    if (!userId) {
      throw new CustomError('User not authenticated', 401);
    }

    const user = await coinService.addCoins(userId, 0);
    res.json({ coins: user.coins });
  } catch (error) {
    next(error);
  }
});

// Transfer coins to another user
router.post('/transfer', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthRequest;
    const { toUserId, amount } = req.body;
    const fromUserId = authReq.user?.id;

    if (!fromUserId) {
      throw new CustomError('User not authenticated', 401);
    }

    if (!toUserId || !amount || amount <= 0) {
      throw new CustomError('Invalid transfer details', 400);
    }

    const result = await coinService.transferCoins(fromUserId, toUserId, amount);
    res.json({
      message: 'Transfer successful',
      from: { userId: result.from.id, coins: result.from.coins },
      to: { userId: result.to.id, coins: result.to.coins }
    });
  } catch (error) {
    next(error);
  }
});

// Admin routes for managing coins
router.post('/admin/add', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user?.isAdmin) {
      throw new CustomError('Unauthorized', 403);
    }

    const { userId, amount } = req.body;
    if (!userId || !amount || amount <= 0) {
      throw new CustomError('Invalid request parameters', 400);
    }

    const user = await coinService.addCoins(userId, amount);
    res.json({
      message: 'Coins added successfully',
      user: { userId: user.id, coins: user.coins }
    });
  } catch (error) {
    next(error);
  }
});

export { router as coinRoutes };