import { Router } from 'express';
import { authService } from '../services/auth.service';
import { authLimiter } from '../middleware/rateLimiter';
import { CustomError } from '../middleware/errorHandler';
import { validateEmail } from '../utils/auth';

const router = Router();

router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new CustomError('Missing required fields', 400);
    }

    const user = await authService.registerUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error);
  }
});

router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError('Missing required fields', 400);
    }

    const result = await authService.loginUser(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/forgot-password', authLimiter, async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !validateEmail(email)) {
      throw new CustomError('Invalid email address', 400);
    }

    const result = await authService.initiatePasswordReset(email);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/reset-password', authLimiter, async (req, res, next) => {
  try {
    const { email, token, newPassword } = req.body;

    if (!email || !token || !newPassword) {
      throw new CustomError('Missing required fields', 400);
    }

    const result = await authService.resetPassword(email, token, newPassword);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export { router as authRoutes };