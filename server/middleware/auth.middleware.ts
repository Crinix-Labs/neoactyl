import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { AuthRequest } from '../types';
import { CustomError } from './errorHandler';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new CustomError('No token provided', 401);
    }

    const decoded = jwt.verify(token, config.jwtSecret) as {
      userId: number;
      isAdmin: boolean;
    };

    (req as AuthRequest).user = {
      id: decoded.userId,
      isAdmin: decoded.isAdmin
    };

    next();
  } catch (error) {
    next(new CustomError('Invalid token', 401));
  }
};