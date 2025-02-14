import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { pterodactylService } from '../services/pterodactyl.service';
import { CustomError } from '../middleware/errorHandler';
import { AuthRequest } from '../types';

const router = Router();

router.get('/', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const servers = await pterodactylService.getServers();
    res.json(servers);
  } catch (error) {
    next(error);
  }
});

router.post('/:serverId/power', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { serverId } = req.params;
    const { action } = req.body;

    if (!['start', 'stop', 'restart'].includes(action)) {
      throw new CustomError('Invalid power action', 400);
    }

    const result = await pterodactylService.powerAction(serverId, action);
    res.json({ message: `Server ${action} command sent`, result });
  } catch (error) {
    next(error);
  }
});

router.get('/:serverId/stats', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { serverId } = req.params;
    const stats = await pterodactylService.getServerStats(serverId);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

export { router as serverRoutes };